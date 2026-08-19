import type { Device } from '../../domain/devices/models/device.js';
import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export class DevicesApi {
  constructor(private readonly client: ApiClient) {}

  get(deviceId: string): Promise<ApiResult<Device>> {
    return this.client.send<Device>(`/devices/${encodeURIComponent(deviceId)}`);
  }
}
