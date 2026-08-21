import { writeFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import { loadEnvironment } from '../../../../config/environments/index.js';
import { AuthApi } from '../../../../packages/api/lifeguard/auth.api.js';
import { lifeguardClient } from '../../../../packages/api/lifeguard/client.js';
import { redact } from '../../../../packages/core/logging/redaction.js';
import { authTokenResponseSchema } from '../../../../schemas/users/auth-token.schema.js';

test.use({
  // The request contains a password and client secret in query parameters.
  trace: 'off'
});

const TEST_CASE_ID = '[TICKET]-G2-01';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured before running this test`);
  }

  return value;
}

test(
  'Verify valid password credentials return tokens for the requested staging user and tenant',
  async ({ request }, testInfo) => {
    testInfo.annotations.push(
      {
        type: 'testCaseId',
        description: TEST_CASE_ID
      },
      {
        type: 'traceability',
        description: 'R3, R4, D1, RK-01'
      },
      {
        type: 'environment',
        description: 'Staging'
      }
    );

    const environment = loadEnvironment();

    if (environment.name !== 'staging') {
      throw new Error(
        `This test is restricted to staging; current environment is ${environment.name}`
      );
    }

    const grantType = requiredEnvironmentVariable('AUTH_GRANT_TYPE');
    const tenant = requiredEnvironmentVariable('AUTH_TENANT');
    const clientId = requiredEnvironmentVariable('CP_CLIENT_ID');
    const clientSecret = requiredEnvironmentVariable('CP_CLIENT_SECRET');
    const username = requiredEnvironmentVariable('INS_USERNAME');
    const password = requiredEnvironmentVariable('INS_PASSWORD');

    const authApi = new AuthApi(lifeguardClient(request, environment));
    const result = await authApi.passwordToken({
      grantType,
      tenant,
      clientId,
      clientSecret,
      username,
      password
    });

    const responseEvidence = {
      testCaseId: TEST_CASE_ID,
      environment: environment.name,
      endpoint: '/lg/user/v2/auth/token',
      method: 'POST',
      status: result.status,
      contentType: result.response.headers()['content-type'] ?? 'not supplied',
      correlationId: result.correlationId,
      body: redact(result.body)
    };

    let safeResponseJson = JSON.stringify(responseEvidence, null, 2);
    const collectionToken = process.env.CLN_AUTH_TOKEN?.trim() ?? '';

    for (const sensitiveValue of [
      username,
      password,
      clientId,
      clientSecret,
      collectionToken
    ]) {
      if (sensitiveValue) {
        safeResponseJson = safeResponseJson.replaceAll(
          sensitiveValue,
          '[REDACTED]'
        );
      }
    }

    const responseFilePath = testInfo.outputPath('password-token-response.json');
    await writeFile(responseFilePath, safeResponseJson, 'utf8');
    await testInfo.attach('password-token-response.json', {
      path: responseFilePath,
      contentType: 'application/json'
    });

    expect(result.status, 'The authentication request should return HTTP 2xx').toBeGreaterThanOrEqual(200);
    expect(result.status, 'The authentication request should not redirect or return an error').toBeLessThan(300);

    const response = authTokenResponseSchema.parse(result.body);

    expect(response.Token.split('.')).toHaveLength(3);
    expect(response.RefreshToken.split('.')).toHaveLength(3);
    expect(response.TokenExpires).toBeGreaterThan(Date.now());
    expect(response.RefreshTokenExpires).toBeGreaterThan(response.TokenExpires);
    expect(response.User.Ten).toBe(tenant);
    expect(response.User.Username).toBe(username);
    expect(response.User.Status).toBe('Enabled');
    expect(response.User.Pwd).toBeNull();
    expect(response.User.Salt).toBeNull();
  }
);
