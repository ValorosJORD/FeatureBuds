import { z } from 'zod';

const CreatePostSchema = z.object({
  userId: z.string().min(1).max(50),
  title: z.string().min(1),
  bodyText: z.string().min(1),
  topic: z.string().min(1),
});

export { CreatePostSchema };
