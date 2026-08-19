import type { ExecutionPolicy } from './execution-policy.js';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function assertRequestAllowed(method: string, policy: ExecutionPolicy): void {
  const normalized = method.toUpperCase();
  if (!MUTATING_METHODS.has(normalized)) return;

  if (policy.production) {
    throw new Error(`Blocked ${normalized}: production-readonly never permits mutations.`);
  }

  if (!policy.mutationsAllowed) {
    throw new Error(
      `Blocked ${normalized}: set ALLOW_MUTATIONS=true for an approved non-production run.`
    );
  }
}
