import type { BaseValidatorOptions } from '../../shared/types.js';

export interface SsnOptions extends BaseValidatorOptions {
  requireHyphens?: boolean;
  format?: 'us';
}
