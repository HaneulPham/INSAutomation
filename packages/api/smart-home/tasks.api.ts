import type { CreateTaskRequest } from '../../domain/tasks/contracts/task.contract.js';
import type { Task } from '../../domain/tasks/models/task.js';
import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export class TasksApi {
  constructor(private readonly client: ApiClient) {}

  get(taskId: string): Promise<ApiResult<Task>> {
    return this.client.send<Task>(`/tasks/${encodeURIComponent(taskId)}`);
  }

  create(payload: CreateTaskRequest): Promise<ApiResult<Task>> {
    return this.client.send<Task>('/tasks', { method: 'POST', data: payload });
  }

  delete(taskId: string): Promise<ApiResult<unknown>> {
    return this.client.send(`/tasks/${encodeURIComponent(taskId)}`, { method: 'DELETE' });
  }
}
