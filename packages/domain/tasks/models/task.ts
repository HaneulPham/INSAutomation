import type { EntityId } from '../../../core/ids/entity-id.js';

export type TaskStatus = 'draft' | 'active' | 'suspended' | 'completed' | 'deleted';
export type TaskType = 'general' | 'welfare-check';

export interface TaskSchedule {
  dueAt: string;
  reminderAt?: string;
  escalationAt?: string;
  timezone: string;
}

export interface Task {
  id: EntityId<'task'>;
  clientFileId: EntityId<'client-file'>;
  type: TaskType;
  title: string;
  status: TaskStatus;
  schedule: TaskSchedule;
  occurrenceIndex: number;
}
