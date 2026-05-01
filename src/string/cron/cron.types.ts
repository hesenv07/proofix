import type { BaseValidatorOptions } from '../../shared/types.js';

export interface CronOptions extends BaseValidatorOptions {
  allowShortcuts?: boolean;
  allowSeconds?: boolean;
}
