import { z } from 'zod';

import { BASE64_REGEX, BASE64_URL_REGEX } from './base64.consts';

import type { Base64Options } from './base64.types';

export const base64 = (options: Base64Options = {}) => {
  const { message } = options;

  return z
    .string()
    .min(1, message ?? 'Base64 string cannot be empty')
    .regex(BASE64_REGEX, message ?? 'Must be a valid base64 string');
};

export const base64url = (options: Base64Options = {}) => {
  const { message } = options;

  return z
    .string()
    .min(1, message ?? 'Base64url string cannot be empty')
    .regex(BASE64_URL_REGEX, message ?? 'Must be a valid base64url string');
};