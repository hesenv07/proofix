import type { BaseValidatorOptions } from '../../shared/types.js';

export interface PortOptions extends BaseValidatorOptions {
  range?: 'any' | 'registered' | 'dynamic' | 'privileged';
  excludeWellKnown?: boolean;
  excludeZero?: boolean;
}
