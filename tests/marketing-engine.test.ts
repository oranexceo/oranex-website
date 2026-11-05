import { validateMarketingContent } from '../server/marketingValidator';
import { marketingStorage } from '../server/marketingStorage';
import { generateMarketingVariants } from '../server/geminiService';

async function runTests() {
  console.log('🧪 Running ORANEX Marketing Engine Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc}`);
      failed++;
    }
  }

  // ==========================================
  // Test 1: Content Claim Validation Engine
  // ==========================================
  console.log('--- Test Group 1: Content Policy & Truth Validation ---');

  // Compliant post
  const compliantPost = 'High-strength concrete requires chemical stability. OCHEMI Polycarboxylate Ether (PCE 50%) is tested under ASTM C494 Type F standards. Sourced directly via Our Chinese partner with ocean transit to Djibouti Port and inland customs transit to Modjo Dry Port. Request a technical quotation from our Addis Ababa engineering desk.';
  const val1 = validateMarketingContent(compliantPost, 'LinkedIn');
  assert(val1.status === 'PASSED', 'Compliant post passes validation');
  assert(val1.groundedClaims.length >= 3, 'Compliant post identifies at least 3 grounded truth claims');

  // Prohibited: Fabricated sole importer claim
  const badPost1 = 'Oranex is the sole importer of every product in Ethiopia. Order today.';
  const val2 = validateMarketingContent(badPost1, 'LinkedIn');
  assert(val2.status === 'FAILED', 'Fabricated importer claim is rejected');
  assert(val2.issues.some((i) => i.code === 'FABRICATED_IMPORTER_ROLE'), 'Detects FABRICATED_IMPORTER_ROLE issue');

  // Prohibited: Fabricated pricing
  const badPost2 = 'Buy PCE superplasticizer for only $50 per ton in Addis Ababa!';
  const val3 = validateMarketingContent(badPost2, 'LinkedIn');
  assert(val3.status === 'FAILED', 'Invented price per ton is rejected');
  assert(val3.issues.some((i) => i.code === 'INVENTED_PRICING'), 'Detects INVENTED_PRICING issue');

  // Prohibited: Unrealistic delivery promise
  const badPost3 = 'Order now for guaranteed 24-hour delivery direct from overseas factory.';
  const val4 = validateMarketingContent(badPost3, 'LinkedIn');
  assert(val4.status === 'FAILED', 'Guaranteed 24-hour international delivery is rejected');
  assert(val4.issues.some((i) => i.code === 'UNREALISTIC_DELIVERY'), 'Detects UNREALISTIC_DELIVERY issue');

  // Prohibited: Fake testimonial
  const badPost4 = '"Oranex supplies the best chemicals," according to an engineer in Addis Ababa.';
  const val5 = validateMarketingContent(badPost4, 'LinkedIn');
  assert(val5.status === 'FAILED', 'Fabricated testimonial is rejected');
  assert(val5.issues.some((i) => i.code === 'FABRICATED_TESTIMONIAL'), 'Detects FABRICATED_TESTIMONIAL issue');

  // Test Discontinued Units Rejection (AgriLink, ODATA, OSEMI)
  const badDiscontinuedPost = 'Oranex AgriLink offers specialty agricultural exports and ODATA analytics alongside OSEMI components.';
  const val6 = validateMarketingContent(badDiscontinuedPost, 'LinkedIn');
  assert(val6.status === 'FAILED', 'Content referencing discontinued business units is rejected');
  assert(val6.issues.some((i) => i.code === 'DISCONTINUED_BUSINESS_UNIT'), 'Detects DISCONTINUED_BUSINESS_UNIT issue');

  // Verify settings pillars do not contain AgriLink
  const currentSettings = marketingStorage.getSettings();
  assert(!currentSettings.contentPillars.some((p) => /agrilink|odata|osemi/i.test(p)), 'Content pillars do not contain discontinued business units');

  // ==========================================
  // Test Group 2: Persistence & Storage Engine
  // ==========================================
  console.log('\n--- Test Group 2: Persistence & Storage Engine ---');

  const initialSettings = marketingStorage.getSettings();
  assert(typeof initialSettings.globalPause === 'boolean', 'Settings has boolean globalPause');
  assert(initialSettings.contentPillars.length >= 4, 'Settings contains standard content pillars');

  // Create Campaign
  const testCamp = marketingStorage.createCampaign({
    title: 'Automated Test Infrastructure Campaign',
    pillar: 'Construction Chemicals & OCHEMI Admixtures',
    targetAudience: 'Testing Engineers',
    objective: 'LEAD_GENERATION',
    primaryCta: 'Request a Technical Quotation',
    status: 'ACTIVE',
    startDate: '2026-10-16',
    endDate: '2026-12-31'
  });
  assert(testCamp.id.startsWith('camp-'), 'Created campaign has valid ID');

  // Create Post
  const testPost = marketingStorage.createPost({
    campaignId: testCamp.id,
    campaignTitle: testCamp.title,
    pillar: testCamp.pillar,
    platform: 'LinkedIn',
    language: 'en',
    caption: compliantPost,
    headline: 'High-Performance Admixtures Test',
    hashtags: ['#Concrete', '#Test'],
    callToAction: 'Request a Technical Quotation',
    ctaUrl: 'https://oranex.com.et',
    mediaPrompt: 'Test media prompt',
    mediaType: 'IMAGE',
    state: 'draft',
    validationStatus: 'PASSED',
    validationIssues: [],
    groundedClaims: val1.groundedClaims,
    author: 'Test Runner'
  });
  assert(testPost.id.startsWith('post-'), 'Created post has valid ID');
  assert(testPost.state === 'draft', 'New post starts as draft');

  // Transition post state to validated
  const updatedPost = marketingStorage.updatePost(testPost.id, { state: 'validated' });
  assert(updatedPost?.state === 'validated', 'Post transitioned to validated state');

  // ==========================================
  // Test Group 3: Global Pause & Safety Controls
  // ==========================================
  console.log('\n--- Test Group 3: Global Pause & Safety Controls ---');

  // Activate Pause
  marketingStorage.toggleGlobalPause(true, 'Test Runner');
  assert(marketingStorage.getSettings().globalPause === true, 'Global pause toggle activated');

  // Attempt to schedule post while paused should be blocked
  let blockedErrorCaught = false;
  try {
    marketingStorage.updatePost(testPost.id, { state: 'scheduled', scheduledFor: '2026-10-20T10:00:00Z' });
  } catch (err: any) {
    blockedErrorCaught = true;
    assert(err.message.includes('Global pause'), 'Scheduling blocked during global pause');
  }
  assert(blockedErrorCaught, 'Global pause prevented scheduling');

  // Resume Pause
  marketingStorage.toggleGlobalPause(false, 'Test Runner');
  assert(marketingStorage.getSettings().globalPause === false, 'Global pause resumed');

  // Now scheduling should succeed
  const scheduledPost = marketingStorage.updatePost(testPost.id, { state: 'scheduled', scheduledFor: '2026-10-20T10:00:00Z' });
  assert(scheduledPost?.state === 'scheduled', 'Post successfully scheduled after pause released');

  // Audit Log Verification
  const auditLogs = marketingStorage.getAuditLogs();
  assert(auditLogs.length > 0, 'Audit logs recorded actions');
  assert(auditLogs.some((l) => l.action.includes('GLOBAL_PAUSE')), 'Audit log tracks global pause events');

  // Cleanup test post
  marketingStorage.deletePost(testPost.id);
  assert(marketingStorage.getPostById(testPost.id) === null, 'Test post successfully cleaned up');

  // ==========================================
  // Test Group 4: Gemini AI Generation (Live Call)
  // ==========================================
  console.log('\n--- Test Group 4: Gemini AI Generation Integration ---');
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log('  Calling Gemini API (gemini-3.8-flash) for structured variant generation...');
      const generated = await generateMarketingVariants({
        topic: 'OCHEMI Polycarboxylate Ether PCE 50% Water Reduction for High-Strength Concrete',
        pillar: 'Construction Chemicals & OCHEMI Admixtures',
        campaignId: testCamp.id,
        targetMarket: 'Ethiopia',
        language: 'en',
        actor: 'Test Runner'
      });
      assert(generated.length === 3, 'Generated exactly 3 platform variants (LinkedIn, Facebook, Instagram)');
      const platforms = generated.map((g) => g.platform);
      assert(platforms.includes('LinkedIn') && platforms.includes('Facebook') && platforms.includes('Instagram'), 'Variants cover LinkedIn, Facebook, and Instagram');
      assert(generated.every((g) => g.caption.length > 50), 'All variants have substantial body copy');
      assert(generated.every((g) => g.validationStatus !== undefined), 'All variants have validation status');
      console.log(`  Sample LinkedIn Headline: "${generated[0].headline}"`);
      console.log(`  Sample Instagram Media Prompt: "${generated[2].mediaPrompt}"`);
    } catch (err: any) {
      console.error('Gemini test error:', err.message);
      assert(false, `Gemini generation call failed: ${err.message}`);
    }
  } else {
    console.log('  ⚠️ GEMINI_API_KEY not set in test environment, skipping live AI test');
  }

  console.log(`\n========================================`);
  console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Test execution crashed:', e);
  process.exit(1);
});
