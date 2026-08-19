import type { EndpointConfig } from './types.js';

export const lifeguardMobile = (baseUrl: string): EndpointConfig => ({
  baseUrl,
  timeoutMs: 45_000
});
