import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PercentageOptions extends BaseValidatorOptions {
  min?: number;
  max?: number;
  allowDecimals?: boolean;
}
