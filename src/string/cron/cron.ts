import { z } from 'zod';
import type { CronOptions } from './cron.types.js';
import { CRON_SHORTCUTS, CRON_FIELDS_5, CRON_FIELDS_6 } from './cron.consts.js';
import { isValidField } from './cron.utils.js';

export function cron(options: CronOptions = {}) {
  const { allowShortcuts = true, allowSeconds = false, message } = options;

  return z.string().refine(
    (val) => {
      const trimmed = val.trim().toLowerCase();

      if (allowShortcuts && CRON_SHORTCUTS.includes(trimmed)) {
        return true;
      }

      const parts = trimmed.split(/\s+/);
      const expectedFields = allowSeconds ? 6 : 5;

      if (parts.length !== expectedFields) {
        return false;
      }

      const fields = allowSeconds ? CRON_FIELDS_6 : CRON_FIELDS_5;

      return parts.every((part, i) => isValidField(part, fields[i][0], fields[i][1]));
    },
    { message: message ?? 'Invalid cron expression' },
  );
}
