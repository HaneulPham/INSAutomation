import type { EndpointConfig } from './types.js';

export const cpDesktop = (baseUrl: string): EndpointConfig => ({
  baseUrl,
  timeoutMs: 30_000
});
