import { z } from 'zod';

import type { AgeRangeOptions } from './ageRange.types.js';

export function ageRange(options: AgeRangeOptions = {}) {
  const { min = 0, max = 120, message } = options;

  return z.date().refine(
    (dob) => {
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age -= 1;
      }

      return age >= min && age <= max;
    },
    { message: message ?? `Age must be between ${min} and ${max}` },
  );
}
