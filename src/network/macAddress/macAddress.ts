import { z } from 'zod';
import type { MacAddressOptions } from './macAddress.types.js';
import { MAC_PATTERNS } from './macAddress.consts.js';

export function macAddress(options: MacAddressOptions = {}) {
  const { separator, message } = options;

  const pattern = separator !== undefined ? MAC_PATTERNS[separator] : MAC_PATTERNS.any;

  return z.string().refine((val) => pattern.test(val), {
    message: message ?? 'Invalid MAC address',
  });
}
