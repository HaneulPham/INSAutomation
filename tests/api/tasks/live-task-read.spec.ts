import { test, expect } from '@playwright/test';
import { loadEnvironment } from '../../../config/environments/index.js';
import { smartHomeClient } from '../../../packages/api/smart-home/client.js';
import { TasksApi } from '../../../packages/api/smart-home/tasks.api.js';
import { taskSchema } from '../../../schemas/tasks/task.schema.js';

test('Verify an existing task can be retrieved within the configured tenant scope', async ({ request }) => {
  test.skip(process.env.RUN_LIVE_TESTS !== 'true', 'Set RUN_LIVE_TESTS=true to call a live service');
  test.skip(!process.env.INS_API_TASK_ID, 'INS_API_TASK_ID is required');

  const tasks = new TasksApi(smartHomeClient(request, loadEnvironment()));
  const result = await tasks.get(process.env.INS_API_TASK_ID!);

  expect(result.status).toBe(200);
  expect(taskSchema.parse(result.body).id).toBe(process.env.INS_API_TASK_ID);
  expect(result.correlationId).toBeTruthy();
});
