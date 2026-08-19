import type { TaskSchedule } from '../models/task.js';

export function reminderIsPending(schedule: TaskSchedule, now: Date): boolean {
  return Boolean(schedule.reminderAt && Date.parse(schedule.reminderAt) > now.getTime());
}
