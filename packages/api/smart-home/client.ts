import type { APIRequestContext } from '@playwright/test';
import type { EnvironmentConfig } from '../../../config/environments/types.js';
import { NoTokenProvider } from '../../core/auth/token-provider.js';
import { executionPolicy } from '../../core/environment/execution-policy.js';
import { ApiClient } from '../../core/http/api-client.js';
import { smartHomeAuthHeaderProvider } from './auth/smart-home-auth.js';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured for Smart Home requests`);
  }

  return value;
}

export function smartHomeClient(
  request: APIRequestContext,
  environment: EnvironmentConfig
): ApiClient {
  return new ApiClient(
    request,
    environment.services.smartHome.baseUrl,
    executionPolicy(environment),
    new NoTokenProvider(),
    smartHomeAuthHeaderProvider({
      apiKey: requiredEnvironmentVariable('X-API-KEY'),
      hmacSecret: requiredEnvironmentVariable('HMAC_HASH_SECRET')
    })
  );
}
