import type { BaseValidatorOptions } from '../../shared/types.js';

export interface FullNameOptions extends BaseValidatorOptions {
  minWords?: number;
  maxWords?: number;
  minLength?: number;
  maxLength?: number;
  allowNumbers?: boolean;
}
