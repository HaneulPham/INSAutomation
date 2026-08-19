import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  clientFileId: z.string().uuid(),
  recipientId: z.string().min(1),
  channel: z.enum(['fcm', 'sms', 'email', 'twilio']),
  status: z.enum(['pending', 'delivered', 'failed', 'cancelled']),
  correlationId: z.string().min(1)
});
