import type { ApiClient, ApiResult } from '../../core/http/api-client.js';
import type { Alarm } from '../../domain/alarms/models/alarm.js';

export class AlarmsApi {
  constructor(private readonly client: ApiClient) {}

  get(alarmId: string): Promise<ApiResult<Alarm>> {
    return this.client.send<Alarm>(`/alarms/${encodeURIComponent(alarmId)}`);
  }
}
