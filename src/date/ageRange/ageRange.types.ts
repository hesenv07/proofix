import type { BaseValidatorOptions } from '../../shared/types.js';

export interface AgeRangeOptions extends BaseValidatorOptions {
  min?: number;
  max?: number;
}
