import { z } from 'zod';

import { getMsg } from '../../shared';
import { SWIFT_CODE_REGEX } from './swiftCode.consts';

import type { SwiftCodeOptions } from './swiftCode.types';

export const swiftCode = (options: SwiftCodeOptions = {}) => {
  const { message } = options;

  return z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(
      z
        .string()
        .refine((val) => val.length === 8 || val.length === 11, {
          message: getMsg(message, 'invalidLength', 'SWIFT/BIC code must be 8 or 11 characters'),
        })
        .refine((val) => SWIFT_CODE_REGEX.test(val), {
          message: getMsg(message, 'invalidFormat', 'Invalid SWIFT/BIC code format'),
        }),
    );
};
