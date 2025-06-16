import { z } from 'zod/v4';

import { isbnPattern } from '../utils/regex.js';

const bookSchema = z.object({
  author: z
    .string({
      error: 'Author must be a string',
    })
    .max(500, {
      error: 'Author name cannot exceed 500 characters',
    }),

  title: z
    .string({
      error: 'Title must be a string',
    })
    .max(500, {
      error: 'Title cannot exceed 500 characters',
    }),

  description: z
    .string({
      error: 'Description must be a string',
    })
    .max(10000, {
      error: 'Description cannot exceed 10,000 characters',
    })
    .optional(),

  pageNumber: z
    .number({
      error: 'Page number must be a valid number',
    })
    .int({
      error: 'Page number must be a whole number',
    })
    .positive({
      error: 'Page number must be greater than 0',
    })
    .optional(),

  year: z
    .number({
      error: 'Year must be a valid number',
    })
    .int({
      error: 'Year must be a whole number',
    })
    .min(-2000, {
      error: 'Year cannot be earlier than 2000 BC',
    })
    .max(3000, {
      error: 'Year cannot be later than 3000 AD',
    })
    .optional(),

  isbn: z
    .string({
      error: 'ISBN must be a string',
    })
    .regex(isbnPattern, {
      error: 'Please provide a valid ISBN (ISBN-10 or ISBN-13 format)',
    })
    .optional(),

  genre: z
    .array(
      z
        .string({
          error: 'Each genre must be a string',
        })
        .max(50, {
          error: 'Genre name cannot exceed 50 characters',
        }),
      {
        error: 'Genre must be an array of strings',
      }
    )
    .optional(),
});

export { bookSchema };
