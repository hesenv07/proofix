import { z } from 'zod';
import type { LongitudeOptions } from './longitude.types.js';

export function longitude(options: LongitudeOptions = {}) {
  const { maxPrecision = 6, message } = options;

  return z.number().superRefine((val, ctx) => {
    if (val < -180 || val > 180) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? 'Longitude must be between -180 and 180 degrees',
      });
      return;
    }

    const decimalPart = val.toString().split('.')[1];
    if (decimalPart && decimalPart.length > maxPrecision) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? `Longitude must have at most ${maxPrecision} decimal places`,
      });
    }
  });
}
