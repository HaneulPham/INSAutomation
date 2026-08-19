import { uuid } from '../packages/core/ids/uuid.js';

export function serviceRequestFactory(overrides: Record<string, unknown> = {}) {
  return { id: uuid(), clientFileId: uuid(), type: 'technical-issue', status: 'open', ...overrides };
}
