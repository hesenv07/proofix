import { z } from 'zod';
import type { PassportNumberOptions } from './passportNumber.types.js';
import { COUNTRY_PATTERNS } from './passportNumber.consts.js';

export function passportNumber(options: PassportNumberOptions = {}) {
  const { country, message } = options;

  const pattern = country
    ? (COUNTRY_PATTERNS[country.toUpperCase()] ?? /^[A-Z0-9]{5,20}$/)
    : /^[A-Z0-9]{5,20}$/;

  return z.string().refine((val) => pattern.test(val.toUpperCase().replace(/\s/g, '')), {
    message:
      message ?? `Invalid passport number${country ? ` for country ${country.toUpperCase()}` : ''}`,
  });
}
