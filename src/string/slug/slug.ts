import { z } from 'zod';
import { SlugOptions } from './slug.types.js';
import { SLUG_PATTERN } from './slug.consts.js';

export function slug(options: SlugOptions = {}) {
  const { minLength = 1, maxLength = 100, message } = options;

  return z
    .string()
    .min(minLength, message ?? `Slug must be at least ${minLength} characters`)
    .max(maxLength, message ?? `Slug must be at most ${maxLength} characters`)
    .refine((val) => SLUG_PATTERN.test(val), {
      message: message ?? 'Slug must be lowercase letters, numbers, and hyphens only',
    });
}
