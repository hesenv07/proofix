import { z } from 'zod';
import { PasswordOptions } from './password.types.js';

export function password(options: PasswordOptions = {}) {
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecial = false,
    message,
  } = options;

  return z
    .string()
    .min(minLength, message ?? `Password must be at least ${minLength} characters`)
    .max(maxLength, message ?? `Password must be at most ${maxLength} characters`)
    .superRefine((val, ctx) => {
      if (requireUppercase && !/[A-Z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Password must contain at least one uppercase letter',
        });
      }

      if (requireLowercase && !/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Password must contain at least one lowercase letter',
        });
      }

      if (requireNumbers && !/\d/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Password must contain at least one number',
        });
      }

      if (requireSpecial && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Password must contain at least one special character',
        });
      }
    });
}
