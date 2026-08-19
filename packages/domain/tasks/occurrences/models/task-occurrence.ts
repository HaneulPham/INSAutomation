export type OccurrenceStatus = 'scheduled' | 'due' | 'completed' | 'escalated' | 'cancelled';

export interface TaskOccurrence {
  taskId: string;
  index: number;
  dueAt: string;
  status: OccurrenceStatus;
  completedAt?: string;
}
