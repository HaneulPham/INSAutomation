import type { EnvironmentConfig } from '../../../config/environments/types.js';

export interface ExecutionPolicy {
  readonly environment: EnvironmentConfig['name'];
  readonly production: boolean;
  readonly mutationsAllowed: boolean;
  readonly liveTestsEnabled: boolean;
}

export function executionPolicy(environment: EnvironmentConfig): ExecutionPolicy {
  return {
    environment: environment.name,
    production: environment.production,
    mutationsAllowed: environment.mutationsAllowed,
    liveTestsEnabled: process.env.RUN_LIVE_TESTS === 'true'
  };
}
