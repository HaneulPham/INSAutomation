import { randomUUID } from 'node:crypto';

export function newCorrelationId(prefix = 'ins-auto'): string {
  return `${prefix}-${randomUUID()}`;
}
