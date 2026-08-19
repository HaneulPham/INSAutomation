export interface NotificationRecord {
  id: string;
  type: string;
  clientFileId: string;
  recipientId: string;
  channel: 'fcm' | 'sms' | 'email' | 'twilio';
  status: 'pending' | 'delivered' | 'failed' | 'cancelled';
  correlationId: string;
}
