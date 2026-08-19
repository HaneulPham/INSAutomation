import { expect } from '@playwright/test';
import type { TopicPublication } from './topics.js';

export function expectPublishedOnce<T>(publications: TopicPublication<T>[]): void {
  expect(publications).toHaveLength(1);
}
