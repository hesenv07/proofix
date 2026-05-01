import type { BaseValidatorOptions } from '../../shared/types.js';

export interface VatNumberOptions extends BaseValidatorOptions {
  country?: string;
}
