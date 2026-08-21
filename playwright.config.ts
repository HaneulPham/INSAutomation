import { defineConfig } from '@playwright/test';
import { loadEnvironment } from './config/environments/index.js';
import { testProjects } from './config/test-projects.js';

const environment = loadEnvironment();

export default defineConfig({
  testDir: './tests',
  outputDir: './output/evidence/playwright-artifacts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: './output/reports/playwright-html', open: 'never' }],
    ['junit', { outputFile: './output/reports/junit.xml' }]
  ],
  use: {
    baseURL: environment.platforms.api.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-automation-environment': environment.name
    }
  },
  projects: testProjects(environment)
});
