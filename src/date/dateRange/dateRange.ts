// dateRange.ts

import { z } from 'zod';

import { DATE_RANGE_MESSAGES } from './dataRange.consts';

import type { DateRangeInput } from './dateRange.types';

export const dateRange = () =>
  z
    .object({
      start: z.coerce.date({
        errorMap: () => ({ message: DATE_RANGE_MESSAGES.invalidStart }),
      }),
      end: z.coerce.date({
        errorMap: () => ({ message: DATE_RANGE_MESSAGES.invalidEnd }),
      }),
      message: z.string().optional(),
    })
    .refine((val) => val.start < val.end, {
      message: DATE_RANGE_MESSAGES.startBeforeEnd,
      path: ['start'],
    }) satisfies z.ZodType<DateRangeInput>;
