import { z } from 'zod/v4';
import { passwordRegex } from '../utils/regex.js';

// Reading list entry schema
const readingListEntrySchema = z.object({
  bookRefId: z.string(), // ObjectId as string
  status: z.enum(['read', 'pending', 'unknown', 'wishlist']).default('unknown'),
});

// User schema
const userSchema = z.object({
  firstName: z.string().max(512),
  lastName: z.string().max(512),
  readingList: z.array(readingListEntrySchema).default([]),
  email: z.email(),
  password: z.string().min(8).max(512).regex(passwordRegex, {
    error:
      'Password needs to have at least 8 characters, one lowercase, one uppercase, one number and a special character.',
  }),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(512).regex(passwordRegex, {
    error:
      'Password needs to have at least 8 characters, one lowercase, one uppercase, one number and a special character.',
  }),
});

// Export schemas
export { readingListEntrySchema, userSchema, loginSchema };
