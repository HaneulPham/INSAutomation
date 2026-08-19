import { uuid } from '../packages/core/ids/uuid.js';

export function billingFactory(overrides: Record<string, unknown> = {}) {
  return { id: uuid(), clientFileId: uuid(), billingType: 'hardware-rental', status: 'online', ...overrides };
}
