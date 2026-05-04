import type { BaseValidatorOptions } from '../../shared/types.js';

export interface WorkingDayOptions extends BaseValidatorOptions {
  weekendDays?: number[];
}
