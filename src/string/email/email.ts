import { z } from 'zod';
import { EmailOptions } from './email.types.js';
import { DISPOSABLE_DOMAINS } from './email.consts.js';

export function email(options: EmailOptions = {}) {
  const {
    blockDisposable = false,
    allowedDomains,
    blockedDomains,
    allowedTlds,
    maxLength = 254,
    message,
  } = options;

  return z
    .string()
    .max(maxLength, message ?? `Email must be at most ${maxLength} characters`)
    .email(message ?? 'Invalid email address')
    .superRefine((val, ctx) => {
      const domain = val.split('@')[1]?.toLowerCase();
      const tld = domain?.split('.').pop();

      if (!domain) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Invalid email format',
        });
        return;
      }

      if (blockDisposable && DISPOSABLE_DOMAINS.has(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Disposable email addresses are not allowed',
        });
      }

      if (allowedDomains && !allowedDomains.map((d) => d.toLowerCase()).includes(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Email domain must be one of: ${allowedDomains.join(', ')}`,
        });
      }

      if (blockedDomains && blockedDomains.map((d) => d.toLowerCase()).includes(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'This email domain is not allowed',
        });
      }

      if (allowedTlds && tld && !allowedTlds.map((t) => t.toLowerCase()).includes(tld)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Email TLD must be one of: ${allowedTlds.join(', ')}`,
        });
      }
    });
}
