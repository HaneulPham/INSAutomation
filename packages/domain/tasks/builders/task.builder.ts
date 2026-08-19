import { entityId } from '../../../core/ids/entity-id.js';
import { uuid } from '../../../core/ids/uuid.js';
import type { Task } from '../models/task.js';

export class TaskBuilder {
  private value: Task = {
    id: entityId<'task'>(uuid()),
    clientFileId: entityId<'client-file'>(uuid()),
    type: 'general',
    title: 'Automation task',
    status: 'draft',
    occurrenceIndex: 0,
    schedule: {
      dueAt: '2030-01-01T10:00:00.000Z',
      timezone: 'Australia/Sydney'
    }
  };

  asWelfareCheck(): this {
    this.value = { ...this.value, type: 'welfare-check' };
    return this;
  }

  forClientFile(clientFileId: string): this {
    this.value = { ...this.value, clientFileId: entityId<'client-file'>(clientFileId) };
    return this;
  }

  withSchedule(schedule: Task['schedule']): this {
    this.value = { ...this.value, schedule };
    return this;
  }

  build(): Task {
    return structuredClone(this.value);
  }
}
