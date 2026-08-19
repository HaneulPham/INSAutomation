import type { Project } from '@playwright/test';
import type { EnvironmentConfig } from './environments/types.js';

export function testProjects(environment: EnvironmentConfig): Project[] {
  return [
    {
      name: 'framework-smoke',
      testMatch: /tests\/regression\/smoke\/.*\.spec\.ts/
    },
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL: environment.services.smartHome.baseUrl
      }
    },
    {
      name: 'cp-web',
      testMatch: /tests\/cp-web\/.*\.spec\.ts/,
      use: {
        baseURL: environment.platforms.cpWeb.baseUrl,
        browserName: 'chromium',
        ...(process.env.INS_STORAGE_STATE
          ? { storageState: process.env.INS_STORAGE_STATE }
          : {})
      }
    },
    {
      name: 'integration',
      testMatch: /tests\/integration\/.*\.spec\.ts/
    },
    {
      name: 'safety-critical',
      testMatch: /tests\/regression\/safety-critical\/.*\.spec\.ts/
    }
  ];
}
