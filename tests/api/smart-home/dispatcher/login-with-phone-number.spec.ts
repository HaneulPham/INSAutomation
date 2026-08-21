import { test, expect } from '@playwright/test';
import { loadEnvironment } from '../../../../config/environments/index.js';
import { smartHomeClient } from '../../../../packages/api/smart-home/client.js';
import { DispatcherApi } from '../../../../packages/api/smart-home/dispatcher.api.js';

test.use({
  // Avoid capturing the API key, phone number, and IMEI in traces.
  trace: 'off'
});

const TEST_CASE_ID = '[TICKET]-G1-01';
const MESSAGE_TYPE = 'LoginWithPhoneNumberRequest';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured before running this test`);
  }

  return value;
}

test(
  'Verify the dispatcher accepts a LoginWithPhoneNumberRequest for a valid phone and IMEI',
  async ({ request }, testInfo) => {
    testInfo.annotations.push(
      {
        type: 'testCaseId',
        description: TEST_CASE_ID
      },
      {
        type: 'traceability',
        description: 'R1, R2, A1'
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

    const phoneNumber = requiredEnvironmentVariable(
      'DISPATCHER_TEST_PHONE_NUMBER'
    );

    const imei = requiredEnvironmentVariable('DISPATCHER_TEST_IMEI');
    const deviceId = process.env.DISPATCHER_TEST_DEVICE_ID ?? '';

    const dispatcherApi = new DispatcherApi(
      smartHomeClient(request, environment)
    );

    const result = await dispatcherApi.loginWithPhoneNumber({
      phoneNumber,
      imei,
      deviceId
    });

    const status = result.status;

    const safeEvidence = {
      testCaseId: TEST_CASE_ID,
      environment: environment.name,
      service: 'Smart Home',
      endpoint: '/api/dispatcher',
      method: 'POST',
      status,
      contentType: result.response.headers()['content-type'] ?? 'not supplied',
      messageType: MESSAGE_TYPE,
      deviceIdWasBlank: deviceId.length === 0,
      correlationId: result.correlationId,
      timestamp: new Date().toISOString()
    };

    // Do not attach the API key, raw request body, phone number, IMEI,
    // or raw response body.
    await testInfo.attach('dispatcher-response-metadata', {
      contentType: 'application/json',
      body: Buffer.from(JSON.stringify(safeEvidence, null, 2))
    });

    // Preliminary success assertion under A1 until the exact response
    // contract is supplied.
    expect(
      status,
      'The staging dispatcher should return a successful HTTP status'
    ).toBeGreaterThanOrEqual(200);

    expect(
      status,
      'The staging dispatcher should not return a redirect or error status'
    ).toBeLessThan(300);
  }
);
