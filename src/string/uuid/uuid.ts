import { z } from 'zod';
import { UuidOptions } from './uuid.types.js';
import { UUID_PATTERNS } from './uuid.consts.js';

export function uuid(options: UuidOptions = {}) {
  const { version = 'any', message } = options;

  const pattern = UUID_PATTERNS[version.toString()];

  return z.string().refine((val) => pattern.test(val), {
    message: message ?? (version === 'any' ? 'Invalid UUID' : `Invalid UUID v${version}`),
  });
}
