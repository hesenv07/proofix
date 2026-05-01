import { z } from 'zod';
import type { PortOptions } from './port.types.js';
import { PORT_RANGES } from './port.consts.js';

export function port(options: PortOptions = {}) {
  const { range = 'any', excludeWellKnown = false, excludeZero = true, message } = options;

  const { min, max } = PORT_RANGES[range];

  return z
    .number()
    .int(message ?? 'Port must be an integer')
    .superRefine((val, ctx) => {
      if (excludeZero && val === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Port 0 is reserved',
        });
        return;
      }

      if (val < min || val > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? `Port must be between ${min} and ${max}`,
        });
        return;
      }

      if (excludeWellKnown && val >= 0 && val <= 1023) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: message ?? 'Well-known ports (0-1023) are not allowed',
        });
      }
    });
}
