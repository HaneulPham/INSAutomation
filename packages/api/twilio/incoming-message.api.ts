import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export class IncomingMessageApi {
  constructor(private readonly client: ApiClient) {}

  simulate(payload: { from: string; body: string }): Promise<ApiResult<unknown>> {
    return this.client.send('/incoming-message', { method: 'POST', data: payload });
  }
}
