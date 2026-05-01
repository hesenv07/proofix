import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PhoneOptions extends BaseValidatorOptions {
  requireCountryCode?: boolean;
}
