import { z } from 'zod';
import type { LocaleOptions } from './locale.types.js';
import { LOCALE_PATTERN, LOCALE_WITH_REGION_PATTERN } from './locale.consts.js';

export function locale(options: LocaleOptions = {}) {
  const { requireRegion = false, message } = options;

  const pattern = requireRegion ? LOCALE_WITH_REGION_PATTERN : LOCALE_PATTERN;

  return z.string().refine((val) => pattern.test(val), {
    message: message ?? (requireRegion ? 'Invalid locale (region required, e.g. en-US)' : 'Invalid locale (e.g. en or en-US)'),
  });
}
