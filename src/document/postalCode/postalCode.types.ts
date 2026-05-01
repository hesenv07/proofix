import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PostalCodeOptions extends BaseValidatorOptions {
  country: string;
}
