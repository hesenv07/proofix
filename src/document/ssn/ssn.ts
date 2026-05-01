import { z } from 'zod';
import type { SsnOptions } from './ssn.types.js';
import { SSN_PATTERN, INVALID_AREA_NUMBERS, INVALID_FULL_PATTERNS } from './ssn.consts.js';

export function ssn(options: SsnOptions = {}) {
  const { requireHyphens = false, message } = options;

  return z.string().refine(
    (val) => {
      const cleaned = val.trim();

      if (requireHyphens && !/^\d{3}-\d{2}-\d{4}$/.test(cleaned)) {
        return false;
      }

      if (!SSN_PATTERN.test(cleaned)) {
        return false;
      }

      const area = cleaned.slice(0, 3).replace('-', '');
      if (INVALID_AREA_NUMBERS.includes(area)) return false;
      if (area.startsWith('9')) return false;

      for (const pattern of INVALID_FULL_PATTERNS) {
        if (pattern.test(cleaned)) return false;
      }

      return true;
    },
    { message: message ?? 'Invalid Social Security Number' },
  );
}
