import { z } from 'zod';

import type { FutureDateOptions } from './futureDate.types.js';

export function futureDate(options: FutureDateOptions = {}) {
  const { maxYearsAhead, message } = options;

  return z
    .date()
    .refine((val) => val > new Date(), {
      message: message ?? 'Date must be in the future',
    })
    .refine(
      (val) => {
        if (maxYearsAhead === undefined) return true;
        const latest = new Date();
        latest.setFullYear(latest.getFullYear() + maxYearsAhead);
        return val <= latest;
      },
      { message: message ?? `Date cannot be more than ${maxYearsAhead} years in the future` },
    );
}
