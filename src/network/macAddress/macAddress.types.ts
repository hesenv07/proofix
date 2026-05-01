import type { BaseValidatorOptions } from '../../shared/types.js';

export interface MacAddressOptions extends BaseValidatorOptions {
  separator?: ':' | '-' | '';
}
