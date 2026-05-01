import { z } from 'zod';
import type { IbanOptions } from './iban.types.js';

function ibanChecksum(iban: string): boolean {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();

  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleaned)) return false;

  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const numeric = rearranged
    .split('')
    .map((ch) => (ch >= 'A' ? (ch.charCodeAt(0) - 55).toString() : ch))
    .join('');

  let remainder = 0;
  for (const chunk of numeric.match(/.{1,9}/g) ?? []) {
    remainder = Number(`${remainder}${chunk}`) % 97;
  }

  return remainder === 1;
}

export function iban(options: IbanOptions = {}) {
  const { message } = options;

  return z.string().refine((val) => ibanChecksum(val), {
    message: message ?? 'Invalid IBAN',
  });
}
