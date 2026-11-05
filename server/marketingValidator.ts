import { ValidationIssue, ValidationStatus } from './types';
import { APPROVED_ORANEX_KNOWLEDGE, FORBIDDEN_CLAIM_PATTERNS } from './marketingKnowledge';

export interface ValidationResult {
  status: ValidationStatus;
  issues: ValidationIssue[];
  groundedClaims: string[];
}

export function validateMarketingContent(text: string, platform?: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  const groundedClaims: string[] = [];
  const lower = text.toLowerCase();

  // 1. Check against forbidden claim patterns
  for (const rule of FORBIDDEN_CLAIM_PATTERNS) {
    if (rule.pattern.test(text)) {
      issues.push({
        code: rule.code,
        message: rule.message,
        severity: rule.severity
      });
    }
  }

  // 2. Identify grounded truth claims present
  if (lower.includes('oranex')) {
    groundedClaims.push('Identifies Oranex Trading One Member PLC');
  }
  if (lower.includes('chinese partner') || lower.includes('acl e-soul') || lower.includes('acl')) {
    groundedClaims.push('Grounded in Our Chinese partner international sourcing partnership');
  }
  if (lower.includes('ochemi')) {
    groundedClaims.push('Positions OCHEMI specialist chemical program');
  }
  if (lower.includes('astm') || lower.includes('en 934') || lower.includes('iso')) {
    groundedClaims.push('References verified engineering standards (ASTM / EN / ISO)');
  }
  if (lower.includes('djibouti') || lower.includes('modjo')) {
    groundedClaims.push('Grounded in authentic Djibouti–Modjo dry port transit corridor');
  }

  // 3. Platform-specific length and hashtag guidelines
  if (platform === 'LinkedIn') {
    if (text.length > 3000) {
      issues.push({
        code: 'PLATFORM_LENGTH_EXCEEDED',
        message: 'LinkedIn post exceeds recommended 3,000 character limit.',
        severity: 'WARNING'
      });
    }
  } else if (platform === 'Facebook') {
    if (text.length > 2000) {
      issues.push({
        code: 'PLATFORM_LENGTH_EXCEEDED',
        message: 'Facebook post exceeds recommended optimal engagement length.',
        severity: 'WARNING'
      });
    }
  } else if (platform === 'Instagram') {
    if (text.length > 2200) {
      issues.push({
        code: 'PLATFORM_LENGTH_EXCEEDED',
        message: 'Instagram caption exceeds 2,200 character limit.',
        severity: 'WARNING'
      });
    }
  }

  // 4. Check for presence of CTA
  if (!lower.includes('quotation') && !lower.includes('contact') && !lower.includes('inquire') && !lower.includes('link') && !lower.includes('reach out')) {
    issues.push({
      code: 'MISSING_CTA',
      message: 'Post does not contain a clear call-to-action for industrial buyers.',
      severity: 'WARNING'
    });
  }

  // Determine overall status
  const hasCritical = issues.some((i) => i.severity === 'CRITICAL');
  const hasWarning = issues.some((i) => i.severity === 'WARNING');

  const status: ValidationStatus = hasCritical ? 'FAILED' : hasWarning ? 'WARNING' : 'PASSED';

  return {
    status,
    issues,
    groundedClaims
  };
}
