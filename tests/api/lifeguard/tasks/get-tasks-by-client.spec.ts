import { writeFile } from 'node:fs/promises';
import {
  test,
  expect
} from '../../../fixtures/lifeguard-auth.fixture.js';
import { loadEnvironment } from '../../../../config/environments/index.js';
import { lifeguardAwsClient } from '../../../../packages/api/lifeguard/aws-client.js';
import { LifeGuardianTasksApi } from '../../../../packages/api/lifeguard/tasks.api.js';
import { isUuid } from '../../../../packages/core/ids/uuid.js';

test.use({
  // Task responses may contain sensitive client or care information.
  trace: 'off'
});

const TEST_CASE_ID = '[TICKET]-G3-01';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be configured before running this test`);
  }

  return value;
}

function responseSummary(body: unknown): Record<string, unknown> {
  if (Array.isArray(body)) {
    return {
      kind: 'array',
      recordCount: body.length
    };
  }

  if (body && typeof body === 'object') {
    return {
      kind: 'object',
      topLevelKeys: Object.keys(body).sort()
    };
  }

  return {
    kind: body === null ? 'null' : typeof body
  };
}

test(
  'Verify tasks can be retrieved for the configured client and creation timestamp',
  async ({ request, lifeguardAuth }, testInfo) => {
    testInfo.annotations.push(
      {
        type: 'testCaseId',
        description: TEST_CASE_ID
      },
      {
        type: 'traceability',
        description: 'R5, A2, RK-02'
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

    const clientUuid = requiredEnvironmentVariable('TASK_CLIENT_UUID');
    const createdAtText = requiredEnvironmentVariable('TASK_CREATED_AT');
    const createdAt = Number(createdAtText);

    if (!isUuid(clientUuid)) {
      throw new Error('TASK_CLIENT_UUID must be a valid UUID');
    }

    if (!Number.isSafeInteger(createdAt) || createdAt <= 0) {
      throw new Error('TASK_CREATED_AT must be a positive safe integer');
    }

    const tasksApi = new LifeGuardianTasksApi(
      lifeguardAwsClient(request, environment, lifeguardAuth.token)
    );

    const result = await tasksApi.getForClient({
      clientUuid,
      createdAt
    });

    const evidence = {
      testCaseId: TEST_CASE_ID,
      environment: environment.name,
      endpoint: '/lg/task/v2/{client_uuid}',
      method: 'GET',
      filter: 'CreAt',
      status: result.status,
      contentType: result.response.headers()['content-type'] ?? 'not supplied',
      correlationId: result.correlationId,
      authSource: lifeguardAuth.source,
      response: responseSummary(result.body)
    };

    const responseFilePath = testInfo.outputPath('get-tasks-response-summary.json');
    await writeFile(responseFilePath, JSON.stringify(evidence, null, 2), {
      encoding: 'utf8',
      mode: 0o600
    });
    await testInfo.attach('get-tasks-response-summary.json', {
      path: responseFilePath,
      contentType: 'application/json'
    });

    expect(result.status, 'The task request should return HTTP 2xx').toBeGreaterThanOrEqual(200);
    expect(result.status, 'The task request should not redirect or return an error').toBeLessThan(300);
    expect(result.body, 'The task response should contain a JSON object or array').not.toBeNull();
    expect(
      Array.isArray(result.body) || typeof result.body === 'object',
      'The task response should be a JSON object or array'
    ).toBe(true);
  }
);
