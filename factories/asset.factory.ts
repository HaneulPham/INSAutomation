import { uuid } from '../packages/core/ids/uuid.js';

export function assetFactory(overrides: Record<string, unknown> = {}) {
  return { id: uuid(), assetType: 'safety-watch', status: 'available', ...overrides };
}
