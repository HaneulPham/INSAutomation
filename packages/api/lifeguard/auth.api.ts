import type { ApiClient, ApiResult } from '../../core/http/api-client.js';

export interface PasswordTokenInput {
  grantType: string;
  tenant: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  passwordToken(input: PasswordTokenInput): Promise<ApiResult<unknown>> {
    return this.client.send<unknown>('/lg/user/v2/auth/token', {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },
      params: {
        GrantType: input.grantType,
        Tenant: input.tenant,
        ClientId: input.clientId,
        ClientSecret: input.clientSecret,
        Username: input.username,
        Pwd: input.password
      }
    });
  }
}
