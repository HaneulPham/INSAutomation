import type { TaskSchedule, TaskType } from '../models/task.js';

export interface CreateTaskRequest {
  clientFileId: string;
  type: TaskType;
  title: string;
  schedule: TaskSchedule;
}

export interface CompleteOccurrenceRequest {
  taskId: string;
  occurrenceIndex: number;
  completedAt: string;
}
