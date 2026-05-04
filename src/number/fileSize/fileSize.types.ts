import type { BaseValidatorOptions } from '../../shared/types.js';

export interface FileSizeOptions extends BaseValidatorOptions {
  min?: number;
  max?: number;
}
