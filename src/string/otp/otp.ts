import { z } from 'zod';

import { DEFAULT_LENGTH } from './otp.consts';

import type { OtpOptions } from './otp.types';

export const otp = (options: OtpOptions = {}) => {
  const { length = DEFAULT_LENGTH, message } = options;

  return z
    .string()
    .length(length, message ?? `OTP must be exactly ${length} digits`)
    .regex(/^\d+$/, message ?? 'OTP must contain only digits');
};
