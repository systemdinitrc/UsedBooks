import { z } from 'zod';

export const createBidSchema = z.object({
  bidder_name: z.string().min(1, 'Bidder name is required').max(100),
  bid_amount: z.coerce.number().positive('Bid amount must be positive'),
});

export type CreateBidInput = z.infer<typeof createBidSchema>;
