import { z } from 'zod';

export const deviceSchema = z.object({
  id: z.string().uuid(),
  clientFileId: z.string().uuid(),
  type: z.enum(['safety-watch', 'smart-home-mini', 'smart-tracker', 'peripheral']),
  status: z.enum(['online', 'offline', 'removed'])
});
