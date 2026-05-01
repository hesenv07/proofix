import { z } from 'zod';
import type { LatitudeOptions } from './latitude.types.js';

export function latitude(options: LatitudeOptions = {}) {
  const { maxPrecision = 6, message } = options;

  return z.number().superRefine((val, ctx) => {
    if (val < -90 || val > 90) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? 'Latitude must be between -90 and 90 degrees',
      });
      return;
    }

    const decimalPart = val.toString().split('.')[1];
    if (decimalPart && decimalPart.length > maxPrecision) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? `Latitude must have at most ${maxPrecision} decimal places`,
      });
    }
  });
}
