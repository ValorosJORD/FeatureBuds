import { z } from 'zod';

const createPostSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  title: z.string().min(1, 'title is required'),
  bodyText: z.string().min(1, 'bodyText is required'),
  topic: z.string().min(1, 'topic is required'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export { createPostSchema };
