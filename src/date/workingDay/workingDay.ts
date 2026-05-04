import { z } from 'zod';
import type { WorkingDayOptions } from './workingDay.types.js';

export function workingDay(options: WorkingDayOptions = {}) {
  const { weekendDays = [0, 6], message } = options;

  return z.date().refine(
    (val) => !weekendDays.includes(val.getDay()),
    { message: message ?? 'Date must be a working day (not a weekend)' },
  );
}
