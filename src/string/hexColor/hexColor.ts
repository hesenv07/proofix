import { z } from 'zod';
import { HexColorOptions } from './hexColor.types.js';
import { HEX_COLOR_PATTERNS } from './hexColor.consts.js';

export function hexColor(options: HexColorOptions = {}) {
  const { format = 'any', allowWithoutHash = false, message } = options;

  return z.string().refine(
    (val) => {
      let color = val;
      if (allowWithoutHash && !color.startsWith('#')) {
        color = `#${color}`;
      }
      return HEX_COLOR_PATTERNS[format].test(color);
    },
    {
      message:
        message ??
        (format === 'any'
          ? 'Invalid hex color (expected #RGB, #RRGGBB, or #RRGGBBAA)'
          : `Invalid hex color (expected ${format === '3' ? '#RGB' : format === '6' ? '#RRGGBB' : '#RRGGBBAA'})`),
    },
  );
}
