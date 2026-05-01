import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PassportNumberOptions extends BaseValidatorOptions {
  country?: string;
}
