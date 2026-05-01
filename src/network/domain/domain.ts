import { z } from 'zod';
import type { DomainOptions } from './domain.types.js';
import { DOMAIN_PATTERN } from './domain.consts.js';

export function domain(options: DomainOptions = {}) {
  const {
    allowedTlds,
    blockedTlds,
    allowSubdomains = true,
    minLabels = 2,
    maxLabels = 10,
    maxLength = 253,
    message,
  } = options;

  return z
    .string()
    .max(maxLength, message ?? `Domain must be at most ${maxLength} characters`)
    .superRefine((val, ctx) => {
      const cleaned = val.toLowerCase().trim();

      if (!DOMAIN_PATTERN.test(cleaned)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Invalid domain format',
        });
        return;
      }

      const labels = cleaned.split('.');
      const tld = labels[labels.length - 1];

      if (labels.length < minLabels) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Domain must have at least ${minLabels} parts`,
        });
        return;
      }

      if (labels.length > maxLabels) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Domain must have at most ${maxLabels} parts`,
        });
        return;
      }

      if (!allowSubdomains && labels.length > 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Subdomains are not allowed',
        });
        return;
      }

      if (allowedTlds && !allowedTlds.map((t) => t.toLowerCase()).includes(tld)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `TLD must be one of: ${allowedTlds.join(', ')}`,
        });
      }

      if (blockedTlds && blockedTlds.map((t) => t.toLowerCase()).includes(tld)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'This TLD is not allowed',
        });
      }
    });
}
