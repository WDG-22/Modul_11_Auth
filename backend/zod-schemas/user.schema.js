import { z } from 'zod/v4';

// Reading list entry schema
const readingListEntrySchema = z.object({
  bookRefId: z.string(), // ObjectId as string
  status: z.enum(['read', 'pending', 'unknown', 'wishlist']).default('unknown'),
});

// User schema
const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  readingList: z.array(readingListEntrySchema).default([]),
});

// Export schemas
export { readingListEntrySchema, userSchema };
