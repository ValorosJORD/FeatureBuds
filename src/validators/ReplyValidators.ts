import { z } from 'zod';

export const createReplySchema = z.object({
  commentId: z.number(),
  userId: z.number(),
  bodyText: z.string().min(1, 'Reply body is required').max(10000, 'reply is too long'),
});

export type CreateRepluInput = z.infer<typeof createReplySchema>;
