import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export interface GetTasksInput {
  clientUuid: string;
  createdAt: number;
}

export class LifeGuardianTasksApi {
  constructor(private readonly client: ApiClient) {}

  getForClient(input: GetTasksInput): Promise<ApiResult<unknown>> {
    return this.client.send<unknown>(
      `/lg/task/v2/${encodeURIComponent(input.clientUuid)}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json'
        },
        params: {
          CreAt: input.createdAt
        }
      }
    );
  }
}
