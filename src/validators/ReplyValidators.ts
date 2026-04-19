import { z } from 'zod';

const CreateReplySchema = z.object({
  userId: z.string().min(1).max(50),
  commentId: z.string().min(1),
  bodyText: z.string(),
});

const UpdateReplySchema = z.object({
  bodyText: z.string().min(1).optional(),
});

export { CreateReplySchema, UpdateReplySchema };
