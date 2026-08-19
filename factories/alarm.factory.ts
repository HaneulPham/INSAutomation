import { uuid } from '../packages/core/ids/uuid.js';
import type { Alarm } from '../packages/domain/alarms/models/alarm.js';

export function alarmFactory(overrides: Partial<Alarm> = {}): Alarm {
  return {
    id: uuid(),
    clientFileId: uuid(),
    status: 'open',
    source: 'welfare-check',
    correlationId: uuid(),
    ...overrides
  };
}
