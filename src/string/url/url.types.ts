import type { BaseValidatorOptions } from '../../shared/types.js';

export interface UrlOptions extends BaseValidatorOptions {
  protocols?: string[];
  requireHttps?: boolean;
  allowLocalhost?: boolean;
  allowedDomains?: string[];
  blockedDomains?: string[];
  requirePath?: boolean;
  maxLength?: number;
}
