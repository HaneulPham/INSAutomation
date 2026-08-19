export interface QueueMessage<T> {
  messageId: string;
  messageGroupId?: string;
  deduplicationId?: string;
  correlationId: string;
  eventType: string;
  body: T;
}
