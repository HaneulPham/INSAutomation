import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export interface LoginWithPhoneNumberInput {
  phoneNumber: string;
  imei: string;
  deviceId?: string;
}

export class DispatcherApi {
  constructor(private readonly client: ApiClient) {}

  loginWithPhoneNumber(
    input: LoginWithPhoneNumberInput
  ): Promise<ApiResult<unknown>> {
    return this.client.send<unknown>('/api/dispatcher', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/json'
      },
      data: {
        Message: JSON.stringify({
          phoneNumber: input.phoneNumber,
          imei: input.imei
        }),
        DeviceId: input.deviceId ?? '',
        MessageType: 'LoginWithPhoneNumberRequest'
      }
    });
  }
}
