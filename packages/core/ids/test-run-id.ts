import { randomUUID } from 'node:crypto';

export function testRunId(): string {
  return `run-${new Date().toISOString().replace(/[-:.TZ]/g, '')}-${randomUUID().slice(0, 8)}`;
}
