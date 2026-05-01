import type { BaseValidatorOptions } from '../../shared/types.js';

export interface SemverOptions extends BaseValidatorOptions {
  allowPrerelease?: boolean;
  allowBuildMetadata?: boolean;
  minVersion?: string;
  maxVersion?: string;
}
