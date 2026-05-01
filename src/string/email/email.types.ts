import type { BaseValidatorOptions } from '../../shared/types.js';

export interface EmailOptions extends BaseValidatorOptions {
  blockDisposable?: boolean;
  allowedDomains?: string[];
  blockedDomains?: string[];
  allowedTlds?: string[];
  maxLength?: number;
}
