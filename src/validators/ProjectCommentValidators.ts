import { z } from 'zod';

export const createProjectCommentSchema = z.object({
  projectId: z.string().min(1, 'projectId is required'),
  userId: z.string().min(1, 'userId is required'),
  bodyText: z.string().min(1, 'bodyText is required'),
});

export type CreateProjectCommentInput = z.infer<typeof createProjectCommentSchema>;
