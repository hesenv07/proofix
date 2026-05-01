import { z } from 'zod';
import { SemverOptions } from './semver.types.js';
import { SEMVER_PATTERN } from './semver.consts.js';
import { compareVersions } from './semver.utils.js';

export function semver(options: SemverOptions = {}) {
  const {
    allowPrerelease = true,
    allowBuildMetadata = true,
    minVersion,
    maxVersion,
    message,
  } = options;

  return z.string().superRefine((val, ctx) => {
    if (!SEMVER_PATTERN.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? 'Invalid semantic version format',
      });
      return;
    }

    const hasPrerelease = val.includes('-');
    const hasBuildMetadata = val.includes('+');

    if (!allowPrerelease && hasPrerelease) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? 'Pre-release versions are not allowed',
      });
    }

    if (!allowBuildMetadata && hasBuildMetadata) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? 'Build metadata is not allowed',
      });
    }

    if (minVersion && compareVersions(val, minVersion) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? `Version must be at least ${minVersion}`,
      });
    }

    if (maxVersion && compareVersions(val, maxVersion) > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message ?? `Version must be at most ${maxVersion}`,
      });
    }
  });
}
