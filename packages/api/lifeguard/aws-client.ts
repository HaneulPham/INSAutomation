import type { APIRequestContext } from '@playwright/test';
import type { EnvironmentConfig } from '../../../config/environments/types.js';
import {
  RequiredEnvironmentTokenProvider,
  StaticTokenProvider
} from '../../core/auth/token-provider.js';
import { executionPolicy } from '../../core/environment/execution-policy.js';
import { ApiClient } from '../../core/http/api-client.js';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured for LifeGuardian AWS requests`);
  }

  return value;
}

export function lifeguardAwsClient(
  request: APIRequestContext,
  environment: EnvironmentConfig,
  runtimeToken?: string
): ApiClient {
  const baseUrl = requiredEnvironmentVariable('ASW_DOMAIN');
  const parsedBaseUrl = new URL(baseUrl);

  if (environment.name === 'staging' && parsedBaseUrl.protocol !== 'https:') {
    throw new Error('ASW_DOMAIN must use HTTPS in staging');
  }

  return new ApiClient(
    request,
    baseUrl,
    executionPolicy(environment),
    runtimeToken
      ? new StaticTokenProvider(runtimeToken)
      : new RequiredEnvironmentTokenProvider('CLN_AUTH_TOKEN')
  );
}
