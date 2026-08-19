import type { QueueMessage } from './messages.js';

export interface SqsEvidenceClient {
  findByCorrelationId<T>(correlationId: string): Promise<QueueMessage<T>[]>;
}

export class UnsupportedSqsEvidenceClient implements SqsEvidenceClient {
  async findByCorrelationId<T>(_correlationId: string): Promise<QueueMessage<T>[]> {
    throw new Error(
      'SQS evidence access is not configured; developer or operations support is required.'
    );
  }
}
