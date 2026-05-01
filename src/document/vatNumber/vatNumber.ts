import { z } from 'zod';

import { VAT_PATTERNS } from './vatNumber.consts.js';

import type { VatNumberOptions } from './vatNumber.types.js';

export function vatNumber(options: VatNumberOptions = {}) {
  const { country, message } = options;

  return z.string().refine(
    (val) => {
      const cleaned = val.replace(/[\s.-]/g, '').toUpperCase();

      if (country) {
        const pattern = VAT_PATTERNS[country.toUpperCase()];
        if (!pattern) return false;
        return pattern.test(cleaned);
      }

      const prefix = cleaned.slice(0, 2);
      const pattern = VAT_PATTERNS[prefix] ?? VAT_PATTERNS[prefix === 'EL' ? 'GR' : prefix];

      if (!pattern) return false;
      return pattern.test(cleaned);
    },
    { message: message ?? 'Invalid VAT number' },
  );
}
