import type { BaseValidatorOptions } from '../../shared/types.js';

export interface UuidOptions extends BaseValidatorOptions {
  version?: 1 | 3 | 4 | 5 | 7 | 'any';
}
