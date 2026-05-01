import { z } from 'zod';
import type { PostalCodeOptions } from './postalCode.types.js';
import { POSTAL_CODE_PATTERNS } from './postalCode.consts.js';

export function postalCode(options: PostalCodeOptions) {
  const { country, message } = options;

  const pattern = POSTAL_CODE_PATTERNS[country.toUpperCase()];

  if (!pattern) {
    throw new Error(
      `Unsupported country code: ${country}. Supported: ${Object.keys(POSTAL_CODE_PATTERNS).join(', ')}`,
    );
  }

  return z.string().refine((val) => pattern.test(val.trim()), {
    message: message ?? `Invalid postal code for ${country.toUpperCase()}`,
  });
}
