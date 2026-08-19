import { uuid } from '../packages/core/ids/uuid.js';
import type { TaskOccurrence } from '../packages/domain/tasks/occurrences/models/task-occurrence.js';

export function taskOccurrenceFactory(
  overrides: Partial<TaskOccurrence> = {}
): TaskOccurrence {
  return {
    taskId: uuid(),
    index: 0,
    dueAt: '2030-01-01T10:00:00.000Z',
    status: 'scheduled',
    ...overrides
  };
}
