import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string().uuid(),
  clientFileId: z.string().uuid(),
  type: z.enum(['general', 'welfare-check']),
  title: z.string().trim().min(1).max(200),
  status: z.enum(['draft', 'active', 'suspended', 'completed', 'deleted']),
  occurrenceIndex: z.number().int().nonnegative(),
  schedule: z.object({
    dueAt: z.string().datetime(),
    reminderAt: z.string().datetime().optional(),
    escalationAt: z.string().datetime().optional(),
    timezone: z.string().min(1)
  })
});
