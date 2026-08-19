import type { EndpointConfig } from './types.js';

export const cpWeb = (baseUrl: string): EndpointConfig => ({
  baseUrl,
  timeoutMs: 30_000
});
