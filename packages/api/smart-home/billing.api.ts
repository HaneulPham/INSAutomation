import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export interface BillingService {
  id: string;
  clientFileId: string;
  status: 'online' | 'offline';
  billingType: string;
}

export class BillingApi {
  constructor(private readonly client: ApiClient) {}

  get(serviceId: string): Promise<ApiResult<BillingService>> {
    return this.client.send<BillingService>(`/billing/services/${encodeURIComponent(serviceId)}`);
  }
}
