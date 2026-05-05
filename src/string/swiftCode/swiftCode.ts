import { z } from 'zod';

import { SWIFT_CODE_REGEX } from './swiftCode.consts';

import type { SwiftCodeOptions } from './swiftCode.types';

export const swiftCode = (options: SwiftCodeOptions = {}) => {
  const { message } = options;

  return z
    .string()
    .toUpperCase()
    .regex(SWIFT_CODE_REGEX, {
      message: message ?? 'Invalid SWIFT/BIC code format',
    })
    .refine((val) => val.length === 8 || val.length === 11, {
      message: message ?? 'SWIFT/BIC code must be 8 or 11 characters',
    });
};
