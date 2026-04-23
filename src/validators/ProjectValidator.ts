import { z } from 'zod';

export const ProjectCreationSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
});

export const ProjectIdSchema = z.object({
  projectId: z.string(),
});
