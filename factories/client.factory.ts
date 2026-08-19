import { uuid } from '../packages/core/ids/uuid.js';
import type { Client } from '../packages/domain/clients/models/client.js';

export function clientFactory(overrides: Partial<Client> = {}): Client {
  return {
    id: uuid(),
    clientFileId: uuid(),
    tenantId: uuid(),
    displayName: 'Automation Client',
    status: 'active',
    ...overrides
  };
}
