import { z } from 'zod';
import { UrlOptions } from './url.types.js';

export function url(options: UrlOptions = {}) {
  const {
    protocols = ['http', 'https'],
    requireHttps = false,
    allowLocalhost = false,
    allowedDomains,
    blockedDomains,
    requirePath = false,
    maxLength = 2048,
    message,
  } = options;

  return z
    .string()
    .max(maxLength, message ?? `URL must be at most ${maxLength} characters`)
    .url(message ?? 'Invalid URL')
    .superRefine((val, ctx) => {
      let parsed: URL;
      try {
        parsed = new URL(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Invalid URL format',
        });
        return;
      }

      const protocol = parsed.protocol.replace(':', '');
      const hostname = parsed.hostname.toLowerCase();

      if (requireHttps && protocol !== 'https') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'URL must use HTTPS',
        });
      } else if (!protocols.includes(protocol)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `URL protocol must be one of: ${protocols.join(', ')}`,
        });
      }

      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
      if (isLocalhost && !allowLocalhost) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Localhost URLs are not allowed',
        });
      }

      if (allowedDomains && !allowedDomains.some((d) => hostname === d.toLowerCase() || hostname.endsWith(`.${d.toLowerCase()}`))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `URL domain must be one of: ${allowedDomains.join(', ')}`,
        });
      }

      if (blockedDomains && blockedDomains.some((d) => hostname === d.toLowerCase() || hostname.endsWith(`.${d.toLowerCase()}`))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'This URL domain is not allowed',
        });
      }

      if (requirePath && (parsed.pathname === '/' || parsed.pathname === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'URL must include a path',
        });
      }
    });
}
