import type { BaseValidatorOptions } from '../../shared/types.js';

export interface SlugOptions extends BaseValidatorOptions {
  minLength?: number;
  maxLength?: number;
}
