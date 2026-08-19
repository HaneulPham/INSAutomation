import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export interface ActivityRecord {
  id: string;
  clientFileId: string;
  type: string;
  occurredAt: string;
  correlationId?: string;
}

export class ActivitiesApi {
  constructor(private readonly client: ApiClient) {}

  listForClient(clientFileId: string): Promise<ApiResult<ActivityRecord[]>> {
    return this.client.send<ActivityRecord[]>(
      `/activities?clientFileId=${encodeURIComponent(clientFileId)}`
    );
  }
}
