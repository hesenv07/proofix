import type { BaseValidatorOptions } from '../../shared/types.js';

export interface CurrencyOptions extends BaseValidatorOptions {
  min?: number;
  max?: number;
  maxDecimals?: number;
}
