import type { TaskSchedule } from '../models/task.js';

export function validateSchedule(schedule: TaskSchedule): string[] {
  const errors: string[] = [];
  const due = Date.parse(schedule.dueAt);
  if (Number.isNaN(due)) errors.push('Due time must be a valid ISO date-time');

  if (schedule.reminderAt) {
    const reminder = Date.parse(schedule.reminderAt);
    if (Number.isNaN(reminder)) errors.push('Reminder time must be a valid ISO date-time');
    else if (!Number.isNaN(due) && reminder >= due) {
      errors.push('Reminder time must be earlier than due time');
    }
  }

  if (schedule.escalationAt) {
    const escalation = Date.parse(schedule.escalationAt);
    if (Number.isNaN(escalation)) errors.push('Escalation time must be a valid ISO date-time');
    else if (!Number.isNaN(due) && escalation < due) {
      errors.push('Escalation time cannot be earlier than due time');
    }
  }

  try {
    new Intl.DateTimeFormat('en-AU', { timeZone: schedule.timezone }).format();
  } catch {
    errors.push('Timezone must be a supported IANA timezone');
  }
  return errors;
}
