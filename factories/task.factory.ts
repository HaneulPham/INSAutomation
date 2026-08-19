import { TaskBuilder } from '../packages/domain/tasks/builders/task.builder.js';

export function taskFactory(): TaskBuilder {
  return new TaskBuilder();
}
