import type { APIRequestContext } from '@playwright/test';
import type { EnvironmentConfig } from '../../../config/environments/types.js';
import { NoTokenProvider } from '../../core/auth/token-provider.js';
import { executionPolicy } from '../../core/environment/execution-policy.js';
import { ApiClient } from '../../core/http/api-client.js';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured for LifeGuardian authentication`);
  }

  return value;
}

export function lifeguardClient(
  request: APIRequestContext,
  environment: EnvironmentConfig
): ApiClient {
  const baseUrl = requiredEnvironmentVariable('USER_API_URL');
  const parsedBaseUrl = new URL(baseUrl);

  if (environment.name === 'staging' && parsedBaseUrl.protocol !== 'https:') {
    throw new Error('USER_API_URL must use HTTPS in staging');
  }

  // D1: CP credentials are used for both token query parameters and
  // collection ClientId/ClientSecret headers.
  const clientId = requiredEnvironmentVariable('CP_CLIENT_ID');
  const clientSecret = requiredEnvironmentVariable('CP_CLIENT_SECRET');
  const collectionToken = process.env.CLN_AUTH_TOKEN?.trim() ?? '';

  return new ApiClient(
    request,
    baseUrl,
    executionPolicy(environment),
    new NoTokenProvider(),
    () => ({
      Authorization: `Bearer ${collectionToken}`,
      ClientId: clientId,
      ClientSecret: clientSecret
    })
  );
}
