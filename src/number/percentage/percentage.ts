import { z } from 'zod';
import type { PercentageOptions } from './percentage.types.js';

export function percentage(options: PercentageOptions = {}) {
  const { min = 0, max = 100, allowDecimals = true, message } = options;

  const base = z
    .number()
    .min(min, message ?? `Percentage must be at least ${min}`)
    .max(max, message ?? `Percentage must be at most ${max}`);

  if (!allowDecimals) {
    return base.refine((val) => Number.isInteger(val), {
      message: message ?? 'Percentage must be a whole number',
    });
  }

  return base;
}
