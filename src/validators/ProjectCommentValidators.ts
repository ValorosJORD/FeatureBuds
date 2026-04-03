import { z } from 'zod';

const createProjectCommentSchema = z.object({
  userId: z.string(),
  bodyText: z.string(),
});

export { createProjectCommentSchema };
