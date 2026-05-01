import type { BaseValidatorOptions } from '../../shared/types.js';

export interface IpAddressOptions extends BaseValidatorOptions {
  version?: 4 | 6 | 'both';
}
