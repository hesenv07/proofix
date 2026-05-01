import type { BaseValidatorOptions } from '../../shared/types.js';

export interface FutureDateOptions extends BaseValidatorOptions {
  maxYearsAhead?: number;
}
