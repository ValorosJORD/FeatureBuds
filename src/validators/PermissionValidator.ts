import { z } from 'zod';

export const PermissionIdSchema = z.object({
  userId: z.string(),
  permissionType: z.enum([`BANNED`, `VIEWER`, `EDITOR`, `ADMIN`]),
});
