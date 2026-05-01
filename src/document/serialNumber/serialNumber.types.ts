import type { BaseValidatorOptions } from '../../shared/types.js';

export interface SerialNumberOptions extends BaseValidatorOptions {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  allowHyphens?: boolean;
}
