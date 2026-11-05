import { GoogleGenAI } from '@google/genai';
import { APPROVED_ORANEX_KNOWLEDGE } from './marketingKnowledge';
import { validateMarketingContent } from './marketingValidator';
import { marketingStorage } from './marketingStorage';
import { MarketingLanguage, MarketingPlatform, MarketingPost } from './types';

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured on the server.');
    }
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

export interface GenerationRequest {
  topic: string;
  pillar: string;
  campaignId: string;
  campaignTitle?: string;
  targetMarket?: string;
  language?: MarketingLanguage;
  customCta?: string;
  specificProduct?: string;
  actor?: string;
}

export interface GeneratedVariantResult {
  post: MarketingPost;
  rawResponse: {
    caption: string;
    headline: string;
    hashtags: string[];
    mediaPrompt: string;
  };
}

export async function generateMarketingVariants(req: GenerationRequest): Promise<MarketingPost[]> {
  if (
    /agrilink|odata|osemi/i.test(req.topic) ||
    /agrilink|odata|osemi/i.test(req.pillar) ||
    /agrilink|odata|osemi/i.test(req.specificProduct || '')
  ) {
    throw new Error('Promotion of discontinued business units (AgriLink, ODATA, OSEMI) is prohibited.');
  }

  const ai = getGenAI();
  const lang = req.language || 'en';
  const market = req.targetMarket || 'Ethiopia & East Africa';
  const cta = req.customCta || 'Request a Technical Quotation';
  const campaign = marketingStorage.getCampaigns().find((c) => c.id === req.campaignId);
  const campaignTitle = campaign ? campaign.title : req.campaignTitle || 'General Sourcing Campaign';

  const systemInstruction = `You are the Senior B2B Marketing & Technical Communications Specialist for ORANEX (Oranex Trading One Member PLC).
Your mission is to generate compliant, authentic, and compelling B2B social media content for industrial buyers, contractors, manufacturing plants, and infrastructure developers.

GROUND TRUTH RULES & COMPANY FACTS:
1. Company Name: ORANEX (Oranex Trading One Member PLC), Addis Ababa, Ethiopia. Slogan: "Integrated Supply. Technical Expertise. Global Sourcing."
2. International Sourcing Partner: Our Chinese partner. Customers generally purchase directly from Our Chinese partner for international export supply, with local Oranex coordination.
3. NEVER describe Oranex as the importer of every product.
4. Chemical Brand: OCHEMI is Oranex's specialist construction-chemical family (ASTM C494 Type F/G PCE superplasticizers, SNF powder, crystalline waterproofing).
5. Logistics Corridor: Ocean transit to Djibouti Port, followed by Ethiopian customs transit to Modjo Dry Port / Kality, Addis Ababa (realistic lead time: 30-45 days).
6. FORBIDDEN: Do NOT invent prices, local stock inventory quantities (e.g. do not say "100,000 tons ready in warehouse"), fake customer quotes/testimonials, or unverified claims.
7. FORBIDDEN: Do NOT mention or promote discontinued units (Oranex AgriLink, ODATA Analytics, OSEMI Components). Content must focus strictly on ORANEX Trading, OCHEMI Chemical Solutions, and Construction & Industrial Supply Chain.
8. Always provide a clear, professional Call to Action (e.g., "${cta}").

You must generate THREE distinct platform variants:
- "LinkedIn": Professional engineering tone, technical parameters (standards like ASTM, EN, ISO), B2B procurement benefits, structured formatting.
- "Facebook": Clear, contractor-focused, practical jobsite benefits (strength, slump life, economy), accessible tone.
- "Instagram": Visual-first, striking headline, aesthetic media prompt description, high-impact bullet points, and hashtag set.

Output language: ${lang === 'am' ? 'Amharic (አማርኛ)' : lang === 'fr' ? 'French (Français)' : lang === 'ar' ? 'Arabic (العربية)' : lang === 'pt' ? 'Portuguese' : lang === 'sw' ? 'Swahili' : 'English'}.
Translate and localize naturally for the target market: ${market}.`;

  const prompt = `Topic / Product Scope: "${req.topic}"
Content Pillar: "${req.pillar}"
Specific Product or Feature: "${req.specificProduct || req.topic}"
Target Market: "${market}"
Primary Call to Action: "${cta}"

Generate a valid JSON object matching this schema:
{
  "variants": [
    {
      "platform": "LinkedIn",
      "headline": "Short professional headline",
      "caption": "Full post text with paragraphs and technical details",
      "hashtags": ["#tag1", "#tag2", "#tag3"],
      "mediaPrompt": "Detailed visual art direction prompt describing the photo/render to accompany this post"
    },
    {
      "platform": "Facebook",
      "headline": "Engaging community headline",
      "caption": "Full Facebook post text",
      "hashtags": ["#tag1", "#tag2"],
      "mediaPrompt": "Visual concept prompt"
    },
    {
      "platform": "Instagram",
      "headline": "Visual punchy headline",
      "caption": "Full Instagram caption formatted with linebreaks and emojis",
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4"],
      "mediaPrompt": "High-contrast Instagram photo/carousel prompt"
    }
  ]
}`;

  let parsed: { variants: Array<{ platform: MarketingPlatform; headline: string; caption: string; hashtags: string[]; mediaPrompt: string }> } | null = null;
  let lastError: any = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '{}';
      try {
        parsed = JSON.parse(responseText);
      } catch {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
      }

      if (parsed && Array.isArray(parsed.variants) && parsed.variants.length > 0) {
        break;
      }
    } catch (err: any) {
      lastError = err;
      if (attempt < 3) {
        await new Promise((res) => setTimeout(res, 1200 * attempt));
      }
    }
  }

  if (!parsed || !Array.isArray(parsed.variants)) {
    console.warn('Gemini API temporary unavailability, generating grounded compliant variants:', lastError?.message);
    parsed = generateGroundedFallbackVariants(req.topic, req.pillar, req.specificProduct || req.topic, market, cta, lang);
  }

  const createdPosts: MarketingPost[] = [];

  for (const item of parsed.variants) {
    const platform: MarketingPlatform = item.platform || 'LinkedIn';
    const validation = validateMarketingContent(item.caption, platform);

    // Initial state based on validation
    const state = validation.status === 'FAILED' ? 'held_for_review' : 'draft';

    const post = marketingStorage.createPost(
      {
        campaignId: req.campaignId,
        campaignTitle,
        pillar: req.pillar,
        platform,
        language: lang,
        caption: item.caption,
        headline: item.headline,
        hashtags: item.hashtags || [],
        callToAction: cta,
        ctaUrl: 'https://oranex.com.et/construction-industrial',
        mediaPrompt: item.mediaPrompt || 'Industrial photography of construction project in Africa.',
        mediaType: platform === 'Instagram' ? 'CAROUSEL' : 'IMAGE',
        state,
        validationStatus: validation.status,
        validationIssues: validation.issues,
        groundedClaims: validation.groundedClaims,
        author: 'AI Content Studio (Gemini 3.8 Flash)'
      },
      req.actor || 'admin'
    );

    createdPosts.push(post);
  }

  return createdPosts;
}

function generateGroundedFallbackVariants(
  topic: string,
  pillar: string,
  product: string,
  market: string,
  cta: string,
  lang: MarketingLanguage
) {
  const isAm = lang === 'am';

  return {
    variants: [
      {
        platform: 'LinkedIn' as MarketingPlatform,
        headline: isAm
          ? `${product} — አስተማማኝ ዓለም አቀፍ የኢንዱስትሪ አቅርቦት`
          : `${product} — Verified Global Sourcing for Ethiopian Industry`,
        caption: isAm
          ? `የኮንስትራክሽን እና የኢንዱስትሪ ስራዎችዎን ለማቀላጠፍ ${product} ከዓለም አቀፍ አጋራችን Our Chinese partner ጋር በመተባበር ቀጥታ ወደ ኢትዮጵያ ይቀርባል። በ ASTM እና EN ደረጃዎች የተረጋገጡ ዝርዝር መረጃዎች ያሉት ሲሆን በአዲስ አበባ የቴክኒክ ቡድናችን የድጋፍ አገልግሎት ይሰጣል።\n\n${cta} ለማግኘት የኦራኔክስ የቴክኒክ ቢሮን ያነጋግሩ።`
          : `Uncompromising technical specifications for demanding African infrastructure: ${product}. Sourced in direct partnership with Our Chinese partner with verified manufacturer documentation, pre-shipment quality inspection, and multimodal transit to Djibouti Port and Modjo Dry Port.\n\nOur Addis Ababa engineering team provides on-site technical alignment and batching trial support.\n\n${cta}: Contact Oranex procurement desk today.`,
        hashtags: ['#B2BProcurement', '#OranexSupply', '#IndustrialEthiopia', '#EngineeringExcellence'],
        mediaPrompt: `Technical close-up photograph of ${product} in an organized industrial engineering testing laboratory in East Africa.`
      },
      {
        platform: 'Facebook' as MarketingPlatform,
        headline: isAm ? `${product} ለኮንስትራክሽን እና ማምረቻ ድርጅቶች` : `${product} for Ethiopian Contractors & Manufacturers`,
        caption: isAm
          ? `የድርጅትዎን ምርታማነት ለማሳደግ ከፍተኛ ጥራት ያለው ${product} በኦራኔክስ እና Our Chinese partner አስተማማኝ አቅርቦት መስመር ይዘዙ። ከፋብሪካ ቀጥታ በማስመጣት የወጪ ቁጠባ እና አስተማማኝ የጉምሩክ ክሊራንስ ድጋፍ ያግኙ።\n\n${cta} — አሁኑኑ ይደውሉልን ወይም በድረ-ገፃችን ይጠይቁ።`
          : `Scaling your project output requires dependable input pipelines. ${product} delivers certified industrial performance without intermediary markups. Coordinated directly via Our Chinese partner with local support from Oranex Trading One Member PLC.\n\n${cta} — get in touch with our commercial procurement team.`,
        hashtags: ['#EthiopiaBusiness', '#ConstructionSupply', '#OranexTrade'],
        mediaPrompt: `Vibrant photograph of a modern construction project in Ethiopia showing equipment and materials in active use.`
      },
      {
        platform: 'Instagram' as MarketingPlatform,
        headline: isAm ? `${product} | ዓለም አቀፍ አቅርቦት` : `${product} | Global Sourcing & Supply`,
        caption: isAm
          ? `ጥራት። ፍጥነት። አስተማማኝነት።\n\n${product} — በዓለም አቀፍ ደረጃዎች የተመረተ እና በቀጥታ ወደ ኢትዮጵያ የሚቀርብ።\n\n📌 ቀጥታ ዓለም አቀፍ ውል (Our Chinese partner)\n📌 የቴክኒክ ማረጋገጫና ድጋፍ (Oranex)\n\n${cta} — የባዮ ሊንኩን ይጫኑ።`
          : `Built for performance. Engineered for endurance.\n\n${product} connects Ethiopian industrial builders with certified international manufacturing through Our Chinese partner.\n\n• Verified ASTM/EN specifications\n• Consolidated ocean shipping to Djibouti\n• Local engineering follow-up in Addis Ababa\n\n${cta} — tap the link in bio to start your procurement request.`,
        hashtags: ['#IndustrialDesign', '#InfrastructureAfrica', '#CivilEngineering', '#Oranex'],
        mediaPrompt: `Aesthetic editorial photograph of ${product} showcased against architectural concrete and steel background.`
      }
    ]
  };
}
