import { z } from 'zod';

export const alarmSchema = z.object({
  id: z.string().uuid(),
  clientFileId: z.string().uuid(),
  status: z.enum(['open', 'acknowledged', 'restored']),
  source: z.enum(['welfare-check', 'device', 'manual']),
  correlationId: z.string().min(1)
});
