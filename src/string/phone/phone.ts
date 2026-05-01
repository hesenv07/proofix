import { z } from 'zod';
import { PhoneOptions } from './phone.types.js';
import { PHONE_WITH_CODE, PHONE_FLEXIBLE } from './phone.consts.js';

export function phone(options: PhoneOptions = {}) {
  const { requireCountryCode = false, message } = options;

  return z.string().refine(
    (val) => {
      const cleaned = val.replace(/\s/g, '');
      return requireCountryCode ? PHONE_WITH_CODE.test(cleaned) : PHONE_FLEXIBLE.test(cleaned);
    },
    { message: message ?? 'Invalid phone number format' },
  );
}
