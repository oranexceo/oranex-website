import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';
import pg from 'pg';

const { Pool } = pg;

// Allowed file specifications
const ALLOWED_EXTENSIONS = ['.pdf', '.xls', '.xlsx', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/jpg'
]);

const MAX_FILE_SIZE = 52428800; // 50 MB

let pgPool: pg.Pool | null = null;

function getDbUrl(): string | undefined {
  return process.env.DATABASE_URL || undefined;
}

function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET_KEY || undefined;
}

function getSupabaseConfig() {
  const dbUrl = getDbUrl();
  let defaultUrl = 'https://bdcvqkajcyzqrcuiukjf.supabase.co';
  if (dbUrl) {
    const match = dbUrl.match(/postgres\.([a-zA-Z0-9]+):/);
    if (match) {
      defaultUrl = `https://${match[1]}.supabase.co`;
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL && !process.env.SUPABASE_URL.includes('your-project-id')
    ? process.env.SUPABASE_URL
    : defaultUrl;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('eyJh...')
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : undefined;

  return { supabaseUrl, serviceKey };
}

function getPgPool(): pg.Pool | null {
  if (!pgPool) {
    const connStr = getDbUrl();
    if (connStr) {
      try {
        pgPool = new Pool({
          connectionString: connStr,
          ssl: { rejectUnauthorized: false },
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000
        });
        pgPool.on('error', (err) => {
          console.error('[STORAGE PG CLIENT ERROR]', err);
        });
      } catch (err) {
        console.error('[STORAGE PG POOL INIT ERROR]', err);
      }
    }
  }
  return pgPool;
}

function sanitizeFileName(filename: string): string {
  const base = filename.replace(/^.*[\\\/]/, '').trim();
  return base.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
}

function formatBytes(bytes: number): string {
  if (bytes >= 1048576) {
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function generateSignedToken(storagePath: string, expiresAt: number, secret: string): string {
  return crypto.createHmac('sha256', secret).update(`${storagePath}:${expiresAt}`).digest('hex');
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pool = getPgPool();
  const adminSecret = getAdminSecret();
  const { supabaseUrl, serviceKey } = getSupabaseConfig();

  // ----------------------------------------------------
  // GET: Download file or retrieve signed URL
  // ----------------------------------------------------
  if (req.method === 'GET') {
    const action = req.query.action || 'download';
    const filePath = req.query.path as string;

    if (!filePath) {
      return res.status(400).json({ error: 'File path parameter (?path=...) is required.' });
    }

    // 1. Action: Get short-lived signed download URL (Admin only)
    if (action === 'get-signed-url') {
      const authHeader = req.headers.authorization || '';
      if (!adminSecret || !authHeader.includes(adminSecret)) {
        return res.status(401).json({ error: 'Unauthorized: Valid ADMIN_SECRET_KEY required to generate download URLs.' });
      }

      const expiresIn = 900; // 15 minutes
      const expiresAt = Date.now() + expiresIn * 1000;
      const token = generateSignedToken(filePath, expiresAt, adminSecret);

      const host = req.headers.host || 'www.oranex.com.et';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      const signedUrl = `${protocol}://${host}/api/upload-boq?action=download&path=${encodeURIComponent(filePath)}&token=${token}&expires=${expiresAt}`;

      // Also generate Supabase signed URL if service role key is set
      let supabaseSignedUrl: string | undefined;
      if (serviceKey && supabaseUrl) {
        try {
          const signRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/sign/oranex-boq-documents/${filePath}`, {
            method: 'POST',
            headers: {
              'apikey': serviceKey,
              'Authorization': `Bearer ${serviceKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expiresIn })
          });
          if (signRes.ok) {
            const data = await signRes.json();
            if (data?.signedURL) {
              supabaseSignedUrl = `${supabaseUrl.replace(/\/$/, '')}${data.signedURL}`;
            }
          }
        } catch (e) {
          console.warn('[SUPABASE SIGN WARN]', e);
        }
      }

      return res.status(200).json({
        success: true,
        storagePath: filePath,
        signedUrl: supabaseSignedUrl || signedUrl,
        expiresIn,
        expiresAt: new Date(expiresAt).toISOString()
      });
    }

    // 2. Action: Download binary file
    if (action === 'download') {
      const token = req.query.token as string;
      const expiresStr = req.query.expires as string;
      const authHeader = req.headers.authorization || '';

      let isAuthorized = false;

      // Check direct admin auth
      if (adminSecret && authHeader.includes(adminSecret)) {
        isAuthorized = true;
      }

      // Check HMAC token
      if (!isAuthorized && token && expiresStr && adminSecret) {
        const expiresAt = parseInt(expiresStr, 10);
        if (!isNaN(expiresAt) && expiresAt > Date.now()) {
          const expected = generateSignedToken(filePath, expiresAt, adminSecret);
          const bufToken = Buffer.from(token);
          const bufExpected = Buffer.from(expected);
          if (bufToken.length === bufExpected.length && crypto.timingSafeEqual(bufToken, bufExpected)) {
            isAuthorized = true;
          }
        }
      }

      if (!isAuthorized) {
        return res.status(401).json({
          error: 'Unauthorized: Access to private BOQ documents requires a valid, unexpired signed token or administrative authorization.'
        });
      }

      // Fetch file from database
      if (pool) {
        try {
          const result = await pool.query(
            'SELECT file_name, mime_type, file_size, file_data FROM public.oranex_boq_files WHERE storage_path = $1 LIMIT 1;',
            [filePath]
          );

          if (result.rowCount && result.rows[0].file_data) {
            const file = result.rows[0];
            const buffer = Buffer.from(file.file_data);

            res.setHeader('Content-Type', file.mime_type || 'application/octet-stream');
            res.setHeader('Content-Length', buffer.length);
            res.setHeader('Content-Disposition', `inline; filename="${file.file_name}"`);
            res.setHeader('Cache-Control', 'private, max-age=900');
            return res.status(200).send(buffer);
          }
        } catch (dbErr) {
          console.error('[DOWNLOAD DB ERROR]', dbErr);
        }
      }

      // If not in database, attempt retrieval from Supabase Storage REST if service key is configured
      if (serviceKey && supabaseUrl) {
        try {
          const supRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/authenticated/oranex-boq-documents/${filePath}`, {
            headers: {
              'apikey': serviceKey,
              'Authorization': `Bearer ${serviceKey}`
            }
          });
          if (supRes.ok) {
            const arrayBuf = await supRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuf);
            const contentType = supRes.headers.get('content-type') || 'application/octet-stream';
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Length', buffer.length);
            res.setHeader('Content-Disposition', `inline; filename="${sanitizeFileName(filePath)}"`);
            return res.status(200).send(buffer);
          }
        } catch (supErr) {
          console.error('[DOWNLOAD SUPABASE ERROR]', supErr);
        }
      }

      return res.status(404).json({ error: 'Document not found in private storage.' });
    }

    return res.status(400).json({ error: 'Invalid action requested.' });
  }

  // ----------------------------------------------------
  // POST: Binary Upload or Sign Upload URL
  // ----------------------------------------------------
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const {
        action = 'upload',
        fileName,
        fileType,
        fileSize,
        fileBase64,
        leadId = 'general'
      } = body;

      if (!fileName || !fileType) {
        return res.status(400).json({ error: 'Missing required file metadata (fileName and fileType).' });
      }

      const sanitizedName = sanitizeFileName(fileName);
      const ext = ('.' + sanitizedName.split('.').pop()?.toLowerCase()) as string;

      // 1. Server-side extension validation
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return res.status(400).json({
          error: `Unsupported file extension (${ext}). Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`
        });
      }

      // 2. Server-side MIME type validation
      const normalizedMime = String(fileType).toLowerCase().trim();
      const isAllowedMime = ALLOWED_MIME_TYPES.has(normalizedMime) || normalizedMime.startsWith('image/');
      if (!isAllowedMime) {
        return res.status(400).json({
          error: `Unsupported MIME type (${normalizedMime}). Supported: PDF, Excel (.xls/.xlsx), Word (.doc/.docx), JPEG, PNG.`
        });
      }

      // 3. Server-side size validation (up to 50 MB)
      const numericSize = parseInt(String(fileSize || 0), 10);
      if (numericSize > MAX_FILE_SIZE) {
        return res.status(400).json({
          error: `File size exceeds the 50 MB limit. Provided size: ${formatBytes(numericSize)}.`
        });
      }

      const safeLeadId = String(leadId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || 'lead';
      const storagePath = `boq/${safeLeadId}/${Date.now()}_${sanitizedName}`;

      // Action: Request signed upload URL
      if (action === 'sign-upload') {
        if (serviceKey && supabaseUrl) {
          try {
            const signUploadRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/upload/sign/oranex-boq-documents/${storagePath}`, {
              method: 'POST',
              headers: {
                'apikey': serviceKey,
                'Authorization': `Bearer ${serviceKey}`,
                'Content-Type': 'application/json'
              }
            });

            if (signUploadRes.ok) {
              const signData = await signUploadRes.json();
              const fullUploadUrl = `${supabaseUrl.replace(/\/$/, '')}${signData.url}`;
              return res.status(200).json({
                success: true,
                mode: 'signed-upload',
                signedUploadUrl: fullUploadUrl,
                storagePath,
                bucket: 'oranex-boq-documents',
                expiresIn: 900
              });
            }
          } catch (e) {
            console.warn('[SUPABASE SIGN UPLOAD ERR]', e);
          }
        }

        // Fallback if service key is not configured: server-side upload is ready
        return res.status(200).json({
          success: true,
          mode: 'direct-upload',
          storagePath,
          bucket: 'oranex-boq-documents'
        });
      }

      // Action: Direct binary upload
      if (!fileBase64) {
        return res.status(400).json({ error: 'fileBase64 payload required for direct upload.' });
      }

      const fileBuffer = Buffer.from(fileBase64, 'base64');
      if (fileBuffer.length > MAX_FILE_SIZE) {
        return res.status(400).json({ error: 'Uploaded binary exceeds 50 MB limit.' });
      }

      let storageSaved = false;
      const fileId = crypto.randomUUID();

      // 1. Persist to PostgreSQL storage table via DATABASE_URL
      if (pool) {
        try {
          // A. Insert binary into oranex_boq_files
          await pool.query(`
            INSERT INTO public.oranex_boq_files (
              id, bucket_id, storage_path, file_name, mime_type, file_size, file_data, lead_id
            ) VALUES ($1, 'oranex-boq-documents', $2, $3, $4, $5, $6, $7)
            ON CONFLICT (storage_path) DO UPDATE SET
              file_data = EXCLUDED.file_data,
              file_size = EXCLUDED.file_size,
              updated_at = NOW();
          `, [fileId, storagePath, sanitizedName, normalizedMime, fileBuffer.length, fileBuffer, safeLeadId]);

          // B. Register in storage.objects metadata
          const objectMeta = {
            size: fileBuffer.length,
            mimetype: normalizedMime,
            eTag: `"${crypto.createHash('md5').update(fileBuffer).digest('hex')}"`
          };

          await pool.query(`
            INSERT INTO storage.objects (id, bucket_id, name, metadata)
            VALUES ($1, 'oranex-boq-documents', $2, $3);
          `, [fileId, storagePath, JSON.stringify(objectMeta)]);

          storageSaved = true;
          console.log(`[STORAGE] Persisted document ${sanitizedName} to oranex-boq-documents at ${storagePath}`);
        } catch (dbErr) {
          console.error('[STORAGE DB INSERT ERROR]', dbErr);
        }
      }

      // 2. Also stream to Supabase Storage REST API if service role key is configured
      if (serviceKey && supabaseUrl) {
        try {
          const uploadRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/oranex-boq-documents/${storagePath}`, {
            method: 'POST',
            headers: {
              'apikey': serviceKey,
              'Authorization': `Bearer ${serviceKey}`,
              'Content-Type': normalizedMime,
              'x-upsert': 'true'
            },
            body: fileBuffer
          });

          if (uploadRes.ok) {
            storageSaved = true;
            console.log(`[SUPABASE REST STORAGE] Uploaded ${storagePath} to S3 bucket`);
          } else {
            console.warn('[SUPABASE REST STORAGE WARN]', uploadRes.status, await uploadRes.text());
          }
        } catch (restErr) {
          console.warn('[SUPABASE REST STORAGE EXCEPTION]', restErr);
        }
      }

      if (!storageSaved) {
        return res.status(500).json({
          error: 'Document storage failed. Please check DATABASE_URL and Supabase configuration.'
        });
      }

      const documentMeta = {
        id: fileId,
        name: sanitizedName,
        size: formatBytes(fileBuffer.length),
        bytes: fileBuffer.length,
        type: normalizedMime,
        storagePath,
        bucket: 'oranex-boq-documents',
        leadId: safeLeadId,
        uploadedAt: new Date().toISOString()
      };

      return res.status(201).json({
        success: true,
        document: documentMeta,
        message: 'BOQ document uploaded successfully to private storage.'
      });
    } catch (err: any) {
      console.error('[UPLOAD HANDLER ERROR]', err);
      return res.status(500).json({ error: 'Server error uploading BOQ document.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
