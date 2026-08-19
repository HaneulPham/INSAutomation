import { uuid } from '../packages/core/ids/uuid.js';
import type { Device } from '../packages/domain/devices/models/device.js';

export function deviceFactory(overrides: Partial<Device> = {}): Device {
  return {
    id: uuid(),
    clientFileId: uuid(),
    type: 'safety-watch',
    status: 'online',
    ...overrides
  };
}
