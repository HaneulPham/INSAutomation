import type { CompleteOccurrenceRequest } from '../../domain/tasks/contracts/task.contract.js';
import type { TaskOccurrence } from '../../domain/tasks/occurrences/models/task-occurrence.js';
import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export class TaskOccurrencesApi {
  constructor(private readonly client: ApiClient) {}

  complete(payload: CompleteOccurrenceRequest): Promise<ApiResult<TaskOccurrence>> {
    return this.client.send<TaskOccurrence>(
      `/tasks/${encodeURIComponent(payload.taskId)}/occurrences/${payload.occurrenceIndex}/complete`,
      { method: 'POST', data: { completedAt: payload.completedAt } }
    );
  }
}























