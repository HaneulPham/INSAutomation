import type { RemoteServiceConfig } from './types.js';

export function service(baseUrl: string, enabled = true): RemoteServiceConfig {
  return { baseUrl, enabled, timeoutMs: 20_000 };
}
