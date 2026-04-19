import { z } from 'zod';

const CreatePostSchema = z.object({
  userId: z.string().min(1).max(50),
  title: z.string().min(1),
  bodyText: z.string().min(1),
  topic: z.string().min(1),
});

const UpdatePostSchema = z.object({
  title: z.string().min(1).optional(),
  bodyText: z.string().min(1).optional(),
  topic: z.string().min(1).optional(),
});

export { CreatePostSchema, UpdatePostSchema };
