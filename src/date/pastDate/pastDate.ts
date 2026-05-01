import { z } from 'zod';
import type { PastDateOptions } from './pastDate.types.js';

export function pastDate(options: PastDateOptions = {}) {
  const { maxYearsAgo, message } = options;

  return z
    .date()
    .refine((val) => val < new Date(), {
      message: message ?? 'Date must be in the past',
    })
    .refine(
      (val) => {
        if (maxYearsAgo === undefined) return true;
        const earliest = new Date();
        earliest.setFullYear(earliest.getFullYear() - maxYearsAgo);
        return val >= earliest;
      },
      { message: message ?? `Date cannot be more than ${maxYearsAgo} years ago` },
    );
}
