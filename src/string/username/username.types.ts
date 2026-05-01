import type { BaseValidatorOptions } from '../../shared/types.js';

export interface UsernameOptions extends BaseValidatorOptions {
  minLength?: number;
  maxLength?: number;
  allowHyphens?: boolean;
  allowDots?: boolean;
}
