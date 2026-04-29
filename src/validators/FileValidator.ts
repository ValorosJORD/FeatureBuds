import { z } from 'zod';

export const FilePathSchema = z.object({
  filePath: z.string(),
});
