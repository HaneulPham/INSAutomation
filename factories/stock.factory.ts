import { uuid } from '../packages/core/ids/uuid.js';

export function stockFactory(overrides: Record<string, unknown> = {}) {
  return { id: uuid(), sku: 'AUTO-SKU-001', quantity: 1, ...overrides };
}
