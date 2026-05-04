import type { BaseValidatorOptions } from '../../shared';

export interface OtpOptions extends BaseValidatorOptions {
  min?: number;
  max?: number;
}
