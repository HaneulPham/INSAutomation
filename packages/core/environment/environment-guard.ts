import type { ExecutionPolicy } from './execution-policy.js';

export function assertLiveExecutionAllowed(policy: ExecutionPolicy): void {
  if (!policy.liveTestsEnabled) {
    throw new Error('Live test execution is disabled. Set RUN_LIVE_TESTS=true explicitly.');
  }
}
