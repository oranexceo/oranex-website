import fs from 'fs';
import path from 'path';

const filesToProcess = [
  'src/views/AboutView.tsx',
  'src/views/CatalogView.tsx',
  'src/views/ConstructionIndustrialView.tsx',
  'src/views/HomeView.tsx',
  'src/views/AdminView.tsx',
  'src/views/ContactView.tsx',
  'src/components/modals/QuoteModal.tsx',
  'src/components/admin/MarketingEngine.tsx',
  'src/components/Footer.tsx',
  'src/components/Header.tsx',
  'src/components/ConstructionIndustrialBanner.tsx',
  'src/data/mockData.ts',
  'src/data/approvedKnowledge.ts',
  'src/data/constructionProducts.ts',
  'src/context/AppContext.tsx',
  'server/marketingKnowledge.ts',
  'server/marketingValidator.ts',
  'server/marketingStorage.ts',
  'server/geminiService.ts',
  'server.ts',
  'index.html',
  'tests/marketing-engine.test.ts',
  'marketing-storage.json'
];

for (const relPath of filesToProcess) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace variations
  content = content.replace(/ACL E-SOUL/g, 'Our Chinese partner');
  content = content.replace(/ACL E-Soul/g, 'Our Chinese partner');
  content = content.replace(/ACL E-soul/g, 'Our Chinese partner');
  content = content.replace(/ACL E SOUL/g, 'Our Chinese partner');
  
  // Specific phrases
  content = content.replace(/ACL Direct Supply/g, 'Our Chinese partner Direct Supply');
  content = content.replace(/ACL Sourced/g, 'Our Chinese partner Sourced');
  content = content.replace(/ACL Managed/g, 'Our Chinese partner Managed');
  content = content.replace(/ACL Procurement/g, 'Our Chinese partner Procurement');

  fs.writeFileSync(fullPath, content);
  console.log('Updated:', relPath);
}
