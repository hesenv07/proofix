import type { BaseValidatorOptions } from '../../shared';

export interface OtpOptions extends BaseValidatorOptions {
  length?: number;
  numericOnly?: boolean;
}
