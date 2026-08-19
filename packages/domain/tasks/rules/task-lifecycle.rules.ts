import type { TaskStatus } from '../models/task.js';

const transitions: Record<TaskStatus, readonly TaskStatus[]> = {
  draft: ['active', 'deleted'],
  active: ['suspended', 'completed', 'deleted'],
  suspended: ['active', 'deleted'],
  completed: [],
  deleted: []
};

export function canTransitionTask(from: TaskStatus, to: TaskStatus): boolean {
  return transitions[from].includes(to);
}
