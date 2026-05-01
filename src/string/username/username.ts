import { z } from 'zod';
import { UsernameOptions } from './username.types.js';

export function username(options: UsernameOptions = {}) {
  const {
    minLength = 3,
    maxLength = 30,
    allowHyphens = true,
    allowDots = true,
    message,
  } = options;

  const specialChars = ['_'];
  if (allowHyphens) specialChars.push('\\-');
  if (allowDots) specialChars.push('\\.');

  const special = specialChars.join('');
  const bodyPattern = new RegExp(`^[a-zA-Z0-9${special}]+$`);
  const edgePattern = /^[a-zA-Z0-9]/;
  const endEdgePattern = /[a-zA-Z0-9]$/;

  return z
    .string()
    .min(minLength, message ?? `Username must be at least ${minLength} characters`)
    .max(maxLength, message ?? `Username must be at most ${maxLength} characters`)
    .superRefine((val, ctx) => {
      if (!bodyPattern.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Username contains invalid characters',
        });
        return;
      }

      if (!edgePattern.test(val) || !endEdgePattern.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Username must start and end with a letter or number',
        });
      }
    });
}
