import type { TopicPublication } from './topics.js';

export interface SnsEvidenceClient {
  findPublications<T>(correlationId: string): Promise<TopicPublication<T>[]>;
}
