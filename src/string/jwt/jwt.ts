import { z } from 'zod';
import { JwtOptions } from './jwt.types.js';
import { JWT_PATTERN } from './jwt.consts.js';

export function jwt(options: JwtOptions = {}) {
  const { message } = options;

  return z.string().refine(
    (val) => {
      if (!JWT_PATTERN.test(val)) return false;

      const parts = val.split('.');
      if (parts.length !== 3) return false;

      try {
        const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

        if (typeof header !== 'object' || !header.alg) return false;

        return true;
      } catch {
        return false;
      }
    },
    { message: message ?? 'Invalid JWT format' },
  );
}
