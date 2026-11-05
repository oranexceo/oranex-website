import pg from 'pg';
import fs from 'fs';
import uploadBoqHandler from '../api/upload-boq';
import leadsHandler from '../api/marketing/leads';

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

function getAdminSecret(): string {
  if (process.env.ADMIN_SECRET_KEY) return process.env.ADMIN_SECRET_KEY;
  if (fs.existsSync('.env.example')) {
    const content = fs.readFileSync('.env.example', 'utf-8');
    const match = content.match(/^ADMIN_SECRET_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }
  throw new Error('ADMIN_SECRET_KEY not found');
}

// Mock Response Helper
function createMockRes() {
  const headers: Record<string, any> = {};
  let statusCode = 200;
  let body: any = null;

  const res: any = {
    statusCode,
    setHeader: (key: string, val: any) => { headers[key.toLowerCase()] = val; return res; },
    status: (code: number) => { res.statusCode = code; return res; },
    json: (data: any) => { body = data; return res; },
    send: (data: any) => { body = data; return res; },
    end: () => res,
    _getHeaders: () => headers,
    _getBody: () => body
  };
  return res;
}

async function runE2ETests() {
  console.log('🧪 Starting ORANEX V2 BOQ Document Storage Integration Tests...\n');
  const pool = new Pool({
    connectionString: getDbUrl(),
    ssl: { rejectUnauthorized: false }
  });
  const adminSecret = getAdminSecret();

  let testStoragePath = '';
  const testLeadId = `OX-TEST-BOQ-${Date.now()}`;

  try {
    // ----------------------------------------------------
    // Test 1: Validation of Invalid Extensions & MIME Types
    // ----------------------------------------------------
    console.log('--- Step 1: Validating Extension & MIME Type Rejection ---');
    const invalidReq: any = {
      method: 'POST',
      headers: {},
      query: {},
      body: {
        action: 'upload',
        fileName: 'malicious_script.exe',
        fileType: 'application/x-msdownload',
        fileSize: 1024,
        fileBase64: Buffer.from('test').toString('base64')
      }
    };
    const invalidRes = createMockRes();
    await uploadBoqHandler(invalidReq, invalidRes);

    if (invalidRes.statusCode === 400 && invalidRes._getBody()?.error?.includes('Unsupported file extension')) {
      console.log('  ✅ PASS: Rejected unauthorized .exe file extension with HTTP 400');
    } else {
      throw new Error(`Expected 400 for .exe file, got ${invalidRes.statusCode}`);
    }

    // ----------------------------------------------------
    // Test 2: Upload Synthetic Valid PDF Document
    // ----------------------------------------------------
    console.log('\n--- Step 2: Uploading Test BOQ PDF to Private Storage ---');
    const samplePdfContent = '%PDF-1.4\n1 0 obj\n<< /Title (ORANEX BOQ TEST) /Author (Eng. Petros Mengesha) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF';
    const samplePdfBuffer = Buffer.from(samplePdfContent, 'utf-8');
    const samplePdfBase64 = samplePdfBuffer.toString('base64');

    const uploadReq: any = {
      method: 'POST',
      headers: {},
      query: {},
      body: {
        action: 'upload',
        fileName: 'ORANEX_SYSTEM_TEST_BOQ.pdf',
        fileType: 'application/pdf',
        fileSize: samplePdfBuffer.length,
        fileBase64: samplePdfBase64,
        leadId: testLeadId
      }
    };
    const uploadRes = createMockRes();
    await uploadBoqHandler(uploadReq, uploadRes);

    if (uploadRes.statusCode !== 201) {
      throw new Error(`Upload failed with status ${uploadRes.statusCode}: ${JSON.stringify(uploadRes._getBody())}`);
    }

    const uploadedDoc = uploadRes._getBody()?.document;
    testStoragePath = uploadedDoc?.storagePath;
    console.log(`  ✅ PASS: Upload succeeded with HTTP 201 (Path: ${testStoragePath}, Size: ${uploadedDoc?.size})`);

    // ----------------------------------------------------
    // Test 3: Confirm File Exists in Private Storage Bucket
    // ----------------------------------------------------
    console.log('\n--- Step 3: Verifying File Persistence in Private Bucket & Database ---');
    const objectQuery = await pool.query(
      `SELECT id, bucket_id, name, metadata FROM storage.objects WHERE bucket_id = 'oranex-boq-documents' AND name = $1;`,
      [testStoragePath]
    );
    if (objectQuery.rowCount === 0) {
      throw new Error(`Object not found in storage.objects for path ${testStoragePath}`);
    }
    console.log(`  ✅ PASS: Verified file exists in storage.objects (Bucket: ${objectQuery.rows[0].bucket_id}, Name: ${objectQuery.rows[0].name})`);

    const fileQuery = await pool.query(
      `SELECT id, storage_path, file_name, mime_type, file_size, length(file_data) as data_len FROM public.oranex_boq_files WHERE storage_path = $1;`,
      [testStoragePath]
    );
    if (fileQuery.rowCount === 0 || Number(fileQuery.rows[0].data_len) !== samplePdfBuffer.length) {
      throw new Error(`Binary file data verification failed in public.oranex_boq_files`);
    }
    console.log(`  ✅ PASS: Verified exact binary data stored in public.oranex_boq_files (${fileQuery.rows[0].data_len} bytes)`);

    // ----------------------------------------------------
    // Test 4: Submit Lead With Document Metadata
    // ----------------------------------------------------
    console.log('\n--- Step 4: Persisting Lead with Document Metadata in public.oranex_leads ---');
    const leadReq: any = {
      method: 'POST',
      headers: {},
      query: {},
      body: {
        id: testLeadId,
        name: 'System Test Engineer',
        company: 'ORANEX SYSTEM TEST (BOQ VERIFICATION)',
        email: 'test-boq-runner@oranex.com.et',
        phone: '+251912233688',
        productOrCategory: 'Road Construction & Asphalt Materials',
        estimatedQuantity: '200 MT Bitumen 60/70',
        deliveryLocation: 'Modjo Dry Port',
        notes: 'Automated BOQ storage integration verification.',
        documents: [uploadedDoc]
      }
    };
    const leadRes = createMockRes();
    await leadsHandler(leadReq, leadRes);

    if (leadRes.statusCode !== 201) {
      throw new Error(`Lead submission failed: ${JSON.stringify(leadRes._getBody())}`);
    }
    console.log(`  ✅ PASS: Customer lead #${testLeadId} inserted with HTTP 201`);

    // Verify lead in database
    const leadDbQuery = await pool.query(
      `SELECT id, company, documents FROM public.oranex_leads WHERE id = $1;`,
      [testLeadId]
    );
    if (leadDbQuery.rowCount === 0) {
      throw new Error(`Lead not found in public.oranex_leads`);
    }
    const leadDocs = leadDbQuery.rows[0].documents;
    const parsedDocs = typeof leadDocs === 'string' ? JSON.parse(leadDocs) : leadDocs;
    if (!Array.isArray(parsedDocs) || parsedDocs[0].storagePath !== testStoragePath) {
      throw new Error(`Document metadata did not match in public.oranex_leads.documents JSONB`);
    }
    console.log(`  ✅ PASS: Confirmed documents JSONB column in public.oranex_leads correctly archived metadata`);

    // ----------------------------------------------------
    // Test 5: Verify Unauthorized Download Access is Blocked
    // ----------------------------------------------------
    console.log('\n--- Step 5: Testing Unauthorized Document Access Rejection ---');
    const unauthReq: any = {
      method: 'GET',
      headers: {},
      query: { action: 'download', path: testStoragePath }
    };
    const unauthRes = createMockRes();
    await uploadBoqHandler(unauthReq, unauthRes);

    if (unauthRes.statusCode === 401) {
      console.log('  ✅ PASS: Direct unauthorized download request rejected with HTTP 401 Unauthorized');
    } else {
      throw new Error(`Expected HTTP 401 for unauthorized download, received ${unauthRes.statusCode}`);
    }

    const tamperedReq: any = {
      method: 'GET',
      headers: {},
      query: {
        action: 'download',
        path: testStoragePath,
        token: 'fake-signature-12345',
        expires: String(Date.now() + 60000)
      }
    };
    const tamperedRes = createMockRes();
    await uploadBoqHandler(tamperedReq, tamperedRes);

    if (tamperedRes.statusCode === 401) {
      console.log('  ✅ PASS: Tampered token download request rejected with HTTP 401 Unauthorized');
    } else {
      throw new Error(`Expected HTTP 401 for tampered signature, received ${tamperedRes.statusCode}`);
    }

    // ----------------------------------------------------
    // Test 6: Verify Authorized Admin Signed URL Generation
    // ----------------------------------------------------
    console.log('\n--- Step 6: Testing Authorized Signed URL Generation & Download ---');
    const signReq: any = {
      method: 'GET',
      headers: { authorization: `Bearer ${adminSecret}` },
      query: { action: 'get-signed-url', path: testStoragePath }
    };
    const signRes = createMockRes();
    await uploadBoqHandler(signReq, signRes);

    if (signRes.statusCode !== 200 || !signRes._getBody()?.signedUrl) {
      throw new Error(`Failed generating signed URL: ${JSON.stringify(signRes._getBody())}`);
    }
    const signedUrl = signRes._getBody().signedUrl;
    console.log(`  ✅ PASS: Generated time-limited signed URL with administrative credentials`);

    // Parse URL parameters from generated signed URL
    const urlObj = new URL(signedUrl, 'http://localhost');
    const dlToken = urlObj.searchParams.get('token');
    const dlExpires = urlObj.searchParams.get('expires');
    const dlPath = urlObj.searchParams.get('path');

    const downloadReq: any = {
      method: 'GET',
      headers: {},
      query: { action: 'download', path: dlPath, token: dlToken, expires: dlExpires }
    };
    const downloadRes = createMockRes();
    await uploadBoqHandler(downloadReq, downloadRes);

    if (downloadRes.statusCode !== 200) {
      throw new Error(`Download with valid signed URL failed with status ${downloadRes.statusCode}`);
    }
    const retrievedBuffer = downloadRes._getBody();
    if (!retrievedBuffer || retrievedBuffer.toString('utf-8') !== samplePdfContent) {
      throw new Error(`Retrieved document binary data does not match original uploaded PDF content`);
    }
    console.log(`  ✅ PASS: Download with signed URL succeeded (HTTP 200, Content-Type: ${downloadRes._getHeaders()['content-type']}, Length: ${retrievedBuffer.length} bytes)`);

    // ----------------------------------------------------
    // Test 7: Verify Admin Leads API Returns Signed Download URLs
    // ----------------------------------------------------
    console.log('\n--- Step 7: Verifying Admin Leads API Returns Enriched Download URLs ---');
    const adminLeadsReq: any = {
      method: 'GET',
      headers: { authorization: `Bearer ${adminSecret}` },
      query: {}
    };
    const adminLeadsRes = createMockRes();
    await leadsHandler(adminLeadsReq, adminLeadsRes);

    if (adminLeadsRes.statusCode !== 200) {
      throw new Error(`Admin leads retrieval failed with status ${adminLeadsRes.statusCode}`);
    }
    const retrievedLeads = adminLeadsRes._getBody()?.leads || [];
    const foundTestLead = retrievedLeads.find((l: any) => l.id === testLeadId);
    if (!foundTestLead) {
      throw new Error(`Test lead not found in admin retrieval`);
    }
    const leadDoc = foundTestLead.documents?.[0];
    if (!leadDoc?.downloadUrl?.includes('token=')) {
      throw new Error(`Admin leads API did not enrich document with signed downloadUrl`);
    }
    console.log(`  ✅ PASS: Admin leads API successfully returned lead with signed download URL`);

  } catch (err: any) {
    console.error('\n❌ TEST RUN FAILED:', err.message);
    process.exit(1);
  } finally {
    // ----------------------------------------------------
    // Cleanup: Strictly Purge Only Fictional Test Records
    // ----------------------------------------------------
    console.log('\n--- Step 8: Purging Fictional Test Data ---');
    try {
      if (testStoragePath) {
        try {
          await pool.query(`SET session_replication_role = 'replica';`);
          await pool.query(`DELETE FROM storage.objects WHERE bucket_id = 'oranex-boq-documents' AND name = $1;`, [testStoragePath]);
          await pool.query(`SET session_replication_role = 'origin';`);
        } catch (delErr: any) {
          console.warn('Note on storage.objects delete:', delErr.message);
        }
        await pool.query(`DELETE FROM public.oranex_boq_files WHERE storage_path = $1;`, [testStoragePath]);
        console.log(`  🧹 Cleaned test file from storage.objects and public.oranex_boq_files`);
      }
      if (testLeadId) {
        await pool.query(`DELETE FROM public.oranex_leads WHERE id = $1;`, [testLeadId]);
        console.log(`  🧹 Cleaned test record from public.oranex_leads`);
      }

      const verifyLeadClean = await pool.query(`SELECT count(*) FROM public.oranex_leads WHERE id = $1;`, [testLeadId]);
      const verifyFileClean = await pool.query(`SELECT count(*) FROM storage.objects WHERE name = $1;`, [testStoragePath]);

      if (verifyLeadClean.rows[0].count === '0' && verifyFileClean.rows[0].count === '0') {
        console.log('  ✅ PASS: Confirmed zero lingering test records in database');
      }
    } catch (cleanErr: any) {
      console.warn('Cleanup warning:', cleanErr.message);
    } finally {
      await pool.end();
    }
  }

  console.log('\n======================================================');
  console.log('🎉 ALL INTEGRATION TESTS PASSED (100% SUCCESS)');
  console.log('======================================================\n');
  process.exit(0);
}

runE2ETests();
