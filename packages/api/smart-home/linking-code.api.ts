import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export interface LinkingCode {
  code: string;
  expiresAt: string;
}

export class LinkingCodeApi {
  constructor(private readonly client: ApiClient) {}

  getForClientFile(clientFileId: string): Promise<ApiResult<LinkingCode>> {
    return this.client.send<LinkingCode>(
      `/client-files/${encodeURIComponent(clientFileId)}/linking-code`
    );
  }
}
