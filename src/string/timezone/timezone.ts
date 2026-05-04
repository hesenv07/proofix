import { z } from 'zod';
import type { TimezoneOptions } from './timezone.types.js';

export function timezone(options: TimezoneOptions = {}) {
  const { message } = options;

  return z.string().refine(
    (val) => {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: val });
        return true;
      } catch {
        return false;
      }
    },
    { message: message ?? 'Invalid timezone (e.g. Europe/Baku)' },
  );
}
