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

async function createBoqFilesTable() {
  const pool = new Pool({
    connectionString: getDbUrl(),
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Creating public.oranex_boq_files table in Supabase PostgreSQL...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.oranex_boq_files (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        bucket_id TEXT NOT NULL DEFAULT 'oranex-boq-documents',
        storage_path TEXT NOT NULL UNIQUE,
        file_name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        file_size BIGINT NOT NULL,
        file_data BYTEA,
        lead_id TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_oranex_boq_files_lead_id ON public.oranex_boq_files(lead_id);
      CREATE INDEX IF NOT EXISTS idx_oranex_boq_files_storage_path ON public.oranex_boq_files(storage_path);
    `);
    console.log('Table public.oranex_boq_files created successfully with indexes.');

    const res = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'oranex_boq_files'
      ORDER BY ordinal_position;
    `);
    console.log('Columns:');
    res.rows.forEach(c => console.log(`- ${c.column_name}: ${c.data_type}`));

  } catch (err: any) {
    console.error('Error creating table:', err.message);
  } finally {
    await pool.end();
  }
}

createBoqFilesTable();
