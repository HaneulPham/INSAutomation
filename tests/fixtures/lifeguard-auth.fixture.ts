import { test as base, expect } from '@playwright/test';
import { loadEnvironment } from '../../config/environments/index.js';
import { AuthApi } from '../../packages/api/lifeguard/auth.api.js';
import { lifeguardClient } from '../../packages/api/lifeguard/client.js';
import { isUuid } from '../../packages/core/ids/uuid.js';
import { authTokenResponseSchema } from '../../schemas/users/auth-token.schema.js';

export interface LifeGuardianAuthState {
  token: string;
  userUuid: string;
  source: 'environment' | 'password-login';
}

type WorkerFixtures = {
  lifeguardAuth: LifeGuardianAuthState;
};

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured for authentication`);
  }

  return value;
}

export const test = base.extend<{}, WorkerFixtures>({
  lifeguardAuth: [
    async ({ playwright }, use) => {
      const existingToken = process.env.CLN_AUTH_TOKEN?.trim();
      const existingUserUuid = process.env.USER_AUTH_UUID?.trim();

      if (existingToken && existingUserUuid) {
        if (!isUuid(existingUserUuid)) {
          throw new Error('USER_AUTH_UUID must be a valid UUID');
        }

        await use({
          token: existingToken,
          userUuid: existingUserUuid,
          source: 'environment'
        });

        return;
      }

      const environment = loadEnvironment();

      if (environment.name !== 'staging') {
        throw new Error(
          `Password authentication is restricted to staging; current environment is ${environment.name}`
        );
      }

      const requestContext = await playwright.request.newContext();

      try {
        const authApi = new AuthApi(lifeguardClient(requestContext, environment));

        const result = await authApi.passwordToken({
          grantType: requiredEnvironmentVariable('AUTH_GRANT_TYPE'),
          tenant: requiredEnvironmentVariable('AUTH_TENANT'),
          clientId: requiredEnvironmentVariable('CP_CLIENT_ID'),
          clientSecret: requiredEnvironmentVariable('CP_CLIENT_SECRET'),
          username: requiredEnvironmentVariable('INS_USERNAME'),
          password: requiredEnvironmentVariable('INS_PASSWORD')
        });

        expect(
          result.status,
          'Password authentication should return HTTP 200'
        ).toBe(200);

        const response = authTokenResponseSchema.parse(result.body);

        expect(response.Token).not.toBe('');
        expect(response.User.Uuid).not.toBe('');
        expect(isUuid(response.User.Uuid)).toBe(true);

        await use({
          token: response.Token,
          userUuid: response.User.Uuid,
          source: 'password-login'
        });
      } finally {
        await requestContext.dispose();
      }
    },
    {
      scope: 'worker'
    }
  ]
});

export { expect } from '@playwright/test';
