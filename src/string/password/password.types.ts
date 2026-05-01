import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PasswordOptions extends BaseValidatorOptions {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecial?: boolean;
}
