import type { APIRequestContext } from '@playwright/test';
import type { EnvironmentConfig } from '../../../config/environments/types.js';
import { EnvironmentTokenProvider } from '../../core/auth/token-provider.js';
import { executionPolicy } from '../../core/environment/execution-policy.js';
import { ApiClient } from '../../core/http/api-client.js';

export function alarmClient(request: APIRequestContext, environment: EnvironmentConfig): ApiClient {
  return new ApiClient(
    request,
    environment.services.alarm.baseUrl,
    executionPolicy(environment),
    new EnvironmentTokenProvider()
  );
}
