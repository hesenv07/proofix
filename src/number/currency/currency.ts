import { z } from 'zod';
import type { CurrencyOptions } from './currency.types.js';
import { DEFAULT_MIN, DEFAULT_MAX_DECIMALS } from './currency.consts.js';

export function currency(options: CurrencyOptions = {}) {
  const { min = DEFAULT_MIN, max, maxDecimals = DEFAULT_MAX_DECIMALS, message } = options;

  return z
    .number()
    .min(min, message ?? `Amount must be at least ${min}`)
    .superRefine((val, ctx) => {
      if (max !== undefined && val > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Amount must be at most ${max}`,
        });
      }

      const str = val.toString();
      const decimals = str.includes('.') ? str.split('.')[1].length : 0;

      if (decimals > maxDecimals) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Amount cannot have more than ${maxDecimals} decimal places`,
        });
      }
    });
}
