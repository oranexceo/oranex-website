import type { IncomingMessage, ServerResponse } from 'http';
import pg from 'pg';

import crypto from 'crypto';

const { Pool } = pg;

function getDbUrl(): string | undefined {
  return process.env.DATABASE_URL || undefined;
}

function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET_KEY || undefined;
}

interface LeadPayload {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productOrCategory?: string;
  productOrScope?: string;
  estimatedQuantity?: string;
  deliveryLocation?: string;
  requiredDeliveryDate?: string;
  procurementPackage?: string;
  notes?: string;
  documents?: Array<{
    id?: string;
    name: string;
    size: string;
    bytes?: number;
    type: string;
    url?: string;
    storagePath?: string;
    bucket?: string;
    uploadedAt?: string;
  }>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status?: string;
  createdAt?: string;
}

// In-memory fallback buffer for current serverless invocation
const inMemoryLeadStore: LeadPayload[] = [];

// Reusable PostgreSQL connection pool for DATABASE_URL
let pgPool: pg.Pool | null = null;

function getPgPool(): pg.Pool | null {
  if (!pgPool) {
    const connStr = getDbUrl();
    if (connStr) {
      try {
        pgPool = new Pool({
          connectionString: connStr,
          ssl: {
            rejectUnauthorized: false
          },
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000
        });

        pgPool.on('error', (err) => {
          console.error('[PG POOL IDLE CLIENT ERROR]', err);
        });
      } catch (err) {
        console.error('[DATABASE_URL POOL INIT ERROR]', err);
      }
    }
  }
  return pgPool;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body: LeadPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      // 1. Strict server-side validation
      if (!body.name || !body.company || (!body.email && !body.phone)) {
        return res.status(400).json({
          error: 'Validation Error: Name, Company, and at least one contact channel (Email or Mobile/WhatsApp) are required.'
        });
      }

      // 2. Sanitize and structure lead record
      const sanitizedLead: LeadPayload = {
        id: body.id || `OX-LEAD-${Date.now()}`,
        name: String(body.name).trim().slice(0, 150),
        company: String(body.company).trim().slice(0, 150),
        email: String(body.email || '').trim().toLowerCase().slice(0, 150),
        phone: String(body.phone || '').trim().slice(0, 50),
        productOrCategory: String(body.productOrCategory || body.productOrScope || 'General Inquiry').trim().slice(0, 250),
        estimatedQuantity: String(body.estimatedQuantity || '').trim().slice(0, 100),
        deliveryLocation: String(body.deliveryLocation || '').trim().slice(0, 150),
        requiredDeliveryDate: String(body.requiredDeliveryDate || '').trim().slice(0, 100),
        procurementPackage: String(body.procurementPackage || 'PACKAGE_A').trim().slice(0, 50),
        notes: String(body.notes || '').trim().slice(0, 2000),
        documents: Array.isArray(body.documents) ? body.documents.slice(0, 10) : [],
        utmSource: String(body.utmSource || '').slice(0, 100),
        utmMedium: String(body.utmMedium || '').slice(0, 100),
        utmCampaign: String(body.utmCampaign || '').slice(0, 100),
        status: 'NEW',
        createdAt: new Date().toISOString()
      };

      let databaseSaved = false;
      let storageDriver = 'memory';

      // 3. PostgreSQL persistence via DATABASE_URL
      const pool = getPgPool();
      if (pool) {
        try {
          const insertQuery = `
            INSERT INTO public.oranex_leads (
              id, name, company, email, phone, product_or_category,
              estimated_quantity, delivery_location, required_delivery_date,
              procurement_package, notes, documents, utm_source, utm_medium,
              utm_campaign, status, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
            RETURNING id, created_at;
          `;
          const values = [
            sanitizedLead.id,
            sanitizedLead.name,
            sanitizedLead.company,
            sanitizedLead.email,
            sanitizedLead.phone,
            sanitizedLead.productOrCategory,
            sanitizedLead.estimatedQuantity,
            sanitizedLead.deliveryLocation,
            sanitizedLead.requiredDeliveryDate,
            sanitizedLead.procurementPackage,
            sanitizedLead.notes,
            JSON.stringify(sanitizedLead.documents || []),
            sanitizedLead.utmSource,
            sanitizedLead.utmMedium,
            sanitizedLead.utmCampaign,
            sanitizedLead.status,
            sanitizedLead.createdAt,
            sanitizedLead.createdAt
          ];

          await pool.query(insertQuery, values);
          databaseSaved = true;
          storageDriver = 'postgresql_database_url';
          console.log(`[DATABASE_URL] Successfully persisted lead #${sanitizedLead.id} to PostgreSQL`);

          // Associate any uploaded files with this lead id
          if (Array.isArray(sanitizedLead.documents) && sanitizedLead.documents.length > 0) {
            const paths = sanitizedLead.documents
              .map((d) => d.storagePath)
              .filter(Boolean);

            if (paths.length > 0) {
              try {
                await pool.query(
                  `UPDATE public.oranex_boq_files SET lead_id = $1 WHERE storage_path = ANY($2);`,
                  [sanitizedLead.id, paths]
                );
              } catch (linkErr) {
                console.warn('[DOC LINK WARN]', linkErr);
              }
            }
          }
        } catch (dbErr) {
          console.error('[DATABASE_URL ERROR] Failed to insert lead:', dbErr);
        }
      }

      // 4. Secondary Supabase REST fallback if DATABASE_URL was not set
      if (!databaseSaved) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

        if (supabaseUrl && supabaseKey) {
          try {
            const dbRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/oranex_leads`, {
              method: 'POST',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
              },
              body: JSON.stringify({
                id: sanitizedLead.id,
                name: sanitizedLead.name,
                company: sanitizedLead.company,
                email: sanitizedLead.email,
                phone: sanitizedLead.phone,
                product_or_category: sanitizedLead.productOrCategory,
                estimated_quantity: sanitizedLead.estimatedQuantity,
                delivery_location: sanitizedLead.deliveryLocation,
                required_delivery_date: sanitizedLead.requiredDeliveryDate,
                procurement_package: sanitizedLead.procurementPackage,
                notes: sanitizedLead.notes,
                documents: sanitizedLead.documents,
                utm_source: sanitizedLead.utmSource,
                utm_medium: sanitizedLead.utmMedium,
                utm_campaign: sanitizedLead.utmCampaign,
                status: sanitizedLead.status,
                created_at: sanitizedLead.createdAt
              })
            });

            if (dbRes.ok) {
              databaseSaved = true;
              storageDriver = 'supabase_rest';
              console.log(`[SUPABASE REST] Stored lead #${sanitizedLead.id}`);
            } else {
              const errBody = await dbRes.text();
              console.error('[SUPABASE REST ERROR]', dbRes.status, errBody);
            }
          } catch (restEx) {
            console.error('[SUPABASE REST EXCEPTION]', restEx);
          }
        }
      }

      // 5. Webhook Dispatch (Slack, Telegram, CRM, Make, Zapier)
      const webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK_URL || process.env.LEAD_NOTIFICATION_WEBHOOK;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'NEW_ORANEX_PROCUREMENT_INQUIRY',
              recipient: process.env.NOTIFICATION_EMAIL || 'Oranexceo@gmail.com',
              lead: sanitizedLead,
              databaseSaved,
              storageDriver
            })
          });
        } catch (webhookErr) {
          console.warn('[LEAD API] Webhook notification skipped:', webhookErr);
        }
      }

      // 6. Resend Email Dispatch (To Oranexceo@gmail.com - zero DNS change needed)
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const recipientEmail = process.env.NOTIFICATION_EMAIL || 'Oranexceo@gmail.com';
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'ORANEX Sourcing Portal <onboarding@resend.dev>',
              to: [recipientEmail],
              subject: `[New Inquiry] ${sanitizedLead.company} - ${sanitizedLead.productOrCategory}`,
              html: `
                <h2>New Procurement Inquiry Received</h2>
                <p><strong>Reference ID:</strong> ${sanitizedLead.id}</p>
                <p><strong>Company:</strong> ${sanitizedLead.company}</p>
                <p><strong>Contact Person:</strong> ${sanitizedLead.name}</p>
                <p><strong>Email:</strong> ${sanitizedLead.email || 'N/A'}</p>
                <p><strong>Mobile/WhatsApp:</strong> ${sanitizedLead.phone || 'N/A'}</p>
                <p><strong>Product/Category:</strong> ${sanitizedLead.productOrCategory}</p>
                <p><strong>Estimated Quantity:</strong> ${sanitizedLead.estimatedQuantity || 'N/A'}</p>
                <p><strong>Delivery Location:</strong> ${sanitizedLead.deliveryLocation || 'N/A'}</p>
                <p><strong>Required Date:</strong> ${sanitizedLead.requiredDeliveryDate || 'N/A'}</p>
                <p><strong>Procurement Package:</strong> ${sanitizedLead.procurementPackage || 'N/A'}</p>
                <p><strong>Database Persisted:</strong> ${databaseSaved ? `YES (${storageDriver})` : 'Pending Database Setup'}</p>
                <p><strong>Notes/Specifications:</strong><br>${sanitizedLead.notes || 'None provided'}</p>
                <hr>
                <p><small>Sent via ORANEX Trading One Member PLC Web Portal (${sanitizedLead.createdAt})</small></p>
              `
            })
          });
        } catch (resendErr) {
          console.warn('[LEAD API] Resend email delivery skipped:', resendErr);
        }
      }

      // Buffer in memory
      inMemoryLeadStore.unshift(sanitizedLead);

      return res.status(201).json({
        success: true,
        referenceId: sanitizedLead.id,
        databaseSaved,
        storageDriver,
        message: databaseSaved
          ? 'Your procurement inquiry has been permanently archived in the ORANEX PostgreSQL database and transmitted to the commercial desk.'
          : 'Your procurement inquiry has been received. Our desk will contact you via WhatsApp or Email.',
        timestamp: sanitizedLead.createdAt
      });
    } catch (err: any) {
      console.error('[LEAD API] Error processing inquiry:', err);
      return res.status(500).json({ error: 'Server error processing inquiry. Please contact Oranexceo@gmail.com or WhatsApp +251 912 233 688 directly.' });
    }
  }

  if (req.method === 'GET') {
    // Strict Admin Authorization Guard (No hardcoded fallback secret!)
    const adminKey = getAdminSecret();
    if (!adminKey) {
      return res.status(500).json({
        error: 'Server configuration error: ADMIN_SECRET_KEY is not configured in environment variables. Access is strictly disabled.'
      });
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader.includes(adminKey)) {
      return res.status(401).json({ error: 'Unauthorized: Valid admin authorization key required to retrieve inquiries.' });
    }

    // Function to generate short-lived signed URLs for documents
    const enrichDocsWithSignedUrls = (leads: any[]) => {
      const expiresIn = 900; // 15 mins
      const expiresAt = Date.now() + expiresIn * 1000;
      return leads.map((lead) => {
        let docs = lead.documents;
        if (typeof docs === 'string') {
          try { docs = JSON.parse(docs); } catch {}
        }
        if (Array.isArray(docs)) {
          docs = docs.map((doc: any) => {
            if (doc.storagePath) {
              const token = crypto
                .createHmac('sha256', adminKey)
                .update(`${doc.storagePath}:${expiresAt}`)
                .digest('hex');
              return {
                ...doc,
                downloadUrl: `/api/upload-boq?action=download&path=${encodeURIComponent(doc.storagePath)}&token=${token}&expires=${expiresAt}`
              };
            }
            return doc;
          });
        }
        return { ...lead, documents: docs };
      });
    };

    // 1. Try querying PostgreSQL via DATABASE_URL
    const pool = getPgPool();
    if (pool) {
      try {
        const result = await pool.query('SELECT * FROM public.oranex_leads ORDER BY created_at DESC LIMIT 100;');
        const enrichedLeads = enrichDocsWithSignedUrls(result.rows);
        return res.status(200).json({
          source: 'postgresql_database_url',
          total: result.rowCount,
          leads: enrichedLeads
        });
      } catch (dbErr) {
        console.warn('[POSTGRES GET ERROR] Falling back:', dbErr);
      }
    }

    // 2. Try fetching from Supabase REST API
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const dbRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/oranex_leads?select=*&order=created_at.desc&limit=100`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        if (dbRes.ok) {
          const records = await dbRes.json();
          return res.status(200).json({
            source: 'supabase_rest',
            total: records.length,
            leads: records
          });
        }
      } catch (restErr) {
        console.warn('[SUPABASE REST GET ERROR]', restErr);
      }
    }

    return res.status(200).json({
      source: 'memory_buffer',
      total: inMemoryLeadStore.length,
      leads: inMemoryLeadStore
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
