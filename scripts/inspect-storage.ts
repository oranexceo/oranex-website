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

async function checkStorage() {
  const dbUrl = getDbUrl();
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const res = await pool.query(`
      SELECT id, name, public, file_size_limit, allowed_mime_types
      FROM storage.buckets;
    `);
    console.log('Buckets found:');
    res.rows.forEach(b => {
      console.log(`- Bucket: ${b.name} (id: ${b.id}), public: ${b.public}, max size: ${b.file_size_limit} bytes`);
      console.log(`  Allowed MIME types:`, b.allowed_mime_types);
    });

    const objCount = await pool.query(`
      SELECT count(*) FROM storage.objects WHERE bucket_id = 'oranex-boq-documents';
    `);
    console.log('Total objects in oranex-boq-documents:', objCount.rows[0].count);

  } catch (err: any) {
    console.error('Database query error:', err.message);
  } finally {
    await pool.end();
  }
}

checkStorage();
