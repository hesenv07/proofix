import { z } from 'zod';

import { getMsg } from '../../shared';
import { DEFAULT_LENGTH } from './otp.consts';

import type { OtpOptions } from './otp.types';

export const otp = (options: OtpOptions = {}) => {
  const { length = DEFAULT_LENGTH, message } = options;

  return z
    .string()
    .length(length, {
      message: getMsg(message, 'invalidLength', `OTP must be exactly ${length} characters long`),
    })
    .regex(/^\d+$/, {
      message: getMsg(message, 'invalidFormat', 'OTP must contain only digits'),
    });
};
