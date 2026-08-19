import type { EndpointConfig } from './types.js';

export const apiPlatform = (baseUrl: string): EndpointConfig => ({
  baseUrl,
  timeoutMs: 20_000
});
