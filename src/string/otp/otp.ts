import { z } from 'zod';

import { DEFAULT_MIN, DEFAULT_MAX } from './otp.consts';

import type { OtpOptions } from './otp.types';

export const otp = (options: OtpOptions = {}) => {
  const { min = DEFAULT_MIN, max = DEFAULT_MAX, message } = options;

  return z
    .string()
    .min(min, message ?? `OTP must be at least ${min} digits`)
    .max(max, message ?? `OTP must be at most ${max} digits`)
    .regex(/^\d+$/, message ?? 'OTP must contain only digits');
};