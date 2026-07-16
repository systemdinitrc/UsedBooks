import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  author: z.string().min(1, 'Author is required').max(200),
  description: z.string().max(2000).optional(),
  suggested_price: z.coerce.number().min(0, 'Price must be non-negative'),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
