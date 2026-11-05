import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;

function getDbUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (fs.existsSync('.env.example')) {
    const content = fs.readFileSync('.env.example', 'utf-8');
    const match = content.match(/^DATABASE_URL=(.+)$/m);
    if (match) return match[1].trim();
  }
  throw new Error('DATABASE_URL not found');
}

async function updateBucketMimeTypes() {
  const pool = new Pool({
    connectionString: getDbUrl(),
    ssl: { rejectUnauthorized: false }
  });

  try {
    const res = await pool.query(`
      UPDATE storage.buckets
      SET allowed_mime_types = ARRAY[
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/*'
      ]
      WHERE id = 'oranex-boq-documents'
      RETURNING id, name, allowed_mime_types;
    `);
    console.log('Updated bucket:', res.rows[0]);
  } catch (err: any) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

updateBucketMimeTypes();
