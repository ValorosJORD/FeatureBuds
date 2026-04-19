import { z } from 'zod';

const createProjectCommentSchema = z.object({
  userId: z.string().min(1).max(50),
  bodyText: z.string(),
});

const UpdateProjectCommentsSchema = z.object({
  bodyText: z.string().min(1),
});
export { createProjectCommentSchema, UpdateProjectCommentsSchema };
