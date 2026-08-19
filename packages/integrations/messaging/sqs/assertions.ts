import { expect } from '@playwright/test';
import type { QueueMessage } from './messages.js';

export function expectSingleQueueOutcome<T>(messages: QueueMessage<T>[], eventType: string): void {
  expect(messages.filter((message) => message.eventType === eventType)).toHaveLength(1);
}
