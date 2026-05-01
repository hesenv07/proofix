import type { BaseValidatorOptions } from '../../shared/types.js';

export interface HexColorOptions extends BaseValidatorOptions {
  format?: '3' | '6' | '8' | 'any';
  allowWithoutHash?: boolean;
}
