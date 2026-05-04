import { z } from 'zod';
import type { FileSizeOptions } from './fileSize.types.js';

export function fileSize(options: FileSizeOptions = {}) {
  const { min = 0, max, message } = options;

  return z
    .number()
    .int(message ?? 'File size must be an integer (bytes)')
    .min(min, message ?? `File size must be at least ${min} bytes`)
    .superRefine((val, ctx) => {
      if (max !== undefined && val > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `File size must be at most ${max} bytes`,
        });
      }
    });
}
