import { z } from 'zod';
import { FullNameOptions } from './fullName.types.js';

export function fullName(options: FullNameOptions = {}) {
  const {
    minWords = 2,
    maxWords = 5,
    minLength = 2,
    maxLength = 100,
    allowNumbers = false,
    message,
  } = options;

  return z
    .string()
    .min(minLength, message ?? `Name must be at least ${minLength} characters`)
    .max(maxLength, message ?? `Name must be at most ${maxLength} characters`)
    .superRefine((val, ctx) => {
      if (!allowNumbers && /\d/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Name must not contain numbers',
        });
        return;
      }

      const words = val.trim().split(/\s+/);

      if (words.length < minWords) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Name must contain at least ${minWords} words`,
        });
      }

      if (words.length > maxWords) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Name must contain at most ${maxWords} words`,
        });
      }
    });
}
