import { z } from 'zod';
import type { MongoIdOptions } from './mongoId.types.js';
import { MONGO_ID_PATTERN } from './mongoId.consts.js';

export function mongoId(options: MongoIdOptions = {}) {
  const { message } = options;

  return z.string().refine((val) => MONGO_ID_PATTERN.test(val), {
    message: message ?? 'Invalid MongoDB ObjectId',
  });
}
