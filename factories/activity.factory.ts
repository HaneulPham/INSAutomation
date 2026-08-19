import { uuid } from '../packages/core/ids/uuid.js';

export function activityFactory(overrides: Record<string, unknown> = {}) {
  return {
    id: uuid(),
    clientFileId: uuid(),
    type: 'TaskCompleted',
    occurredAt: new Date().toISOString(),
    ...overrides
  };
}
