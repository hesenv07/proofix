import type { BaseValidatorOptions } from '../../shared/types.js';

export interface DomainOptions extends BaseValidatorOptions {
  allowedTlds?: string[];
  blockedTlds?: string[];
  allowSubdomains?: boolean;
  minLabels?: number;
  maxLabels?: number;
  maxLength?: number;
}
