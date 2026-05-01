import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PastDateOptions extends BaseValidatorOptions {
  maxYearsAgo?: number;
}
