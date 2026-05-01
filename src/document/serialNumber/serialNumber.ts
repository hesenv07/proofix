import { z } from 'zod';
import type { SerialNumberOptions } from './serialNumber.types.js';

export function serialNumber(options: SerialNumberOptions = {}) {
  const { pattern, minLength = 6, maxLength = 30, allowHyphens = true, message } = options;

  if (pattern) {
    return z.string().refine((val) => pattern.test(val.toUpperCase()), {
      message: message ?? 'Invalid serial number format',
    });
  }

  const charClass = allowHyphens ? '[A-Z0-9\\-]' : '[A-Z0-9]';
  const defaultPattern = new RegExp(`^${charClass}{${minLength},${maxLength}}$`);

  return z.string().refine((val) => defaultPattern.test(val.toUpperCase()), {
    message:
      message ??
      `Serial number must be ${minLength}–${maxLength} alphanumeric characters${allowHyphens ? ' (hyphens allowed)' : ''}`,
  });
}
