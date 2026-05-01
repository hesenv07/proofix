import { z } from 'zod';
import type { IpAddressOptions } from './ipAddress.types.js';
import { IPV4_PATTERN, IPV6_PATTERN } from './ipAddress.consts.js';

export function ipAddress(options: IpAddressOptions = {}) {
  const { version = 'both', message } = options;

  const errorMessage =
    message ??
    (version === 4 ? 'Invalid IPv4 address' : version === 6 ? 'Invalid IPv6 address' : 'Invalid IP address');

  return z.string().refine(
    (val) => {
      if (version === 4) return IPV4_PATTERN.test(val);
      if (version === 6) return IPV6_PATTERN.test(val);
      return IPV4_PATTERN.test(val) || IPV6_PATTERN.test(val);
    },
    { message: errorMessage },
  );
}
