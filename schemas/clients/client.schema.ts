import { z } from 'zod';

export const clientSchema = z.object({
  id: z.string().uuid(),
  clientFileId: z.string().uuid(),
  tenantId: z.string().uuid(),
  displayName: z.string().trim().min(1),
  status: z.enum(['active', 'suspended'])
});
