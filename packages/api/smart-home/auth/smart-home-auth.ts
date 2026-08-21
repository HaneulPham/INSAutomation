import { createHmac } from 'node:crypto';
import type { RequestHeaderProvider } from '../../../core/http/api-client.js';
import { systemClock, type Clock } from '../../../core/time/clock.js';

export interface SmartHomeAuthConfig {
  apiKey: string;
  hmacSecret: string;
  clock?: Clock;
}

export function createSmartHomeHash(
  requestUrl: URL,
  hmacSecret: string,
  clock: Clock = systemClock
): string {
  // Matches Postman: new Date().toISOString().substring(0, 16).
  const utcMinute = clock.now().toISOString().substring(0, 16);

  // The Postman script signs the decoded pathname, excluding host and query.
  // Path parameters are already resolved by the time the client sends the URL.
  const apiName = decodeURIComponent(requestUrl.pathname);

  const firstHashBase64 = createHmac('sha256', hmacSecret)
    .update(`${apiName}_${utcMinute}`, 'utf8')
    .digest('base64');

  return createHmac('sha256', firstHashBase64)
    .update(apiName, 'utf8')
    .digest('base64');
}

export function smartHomeAuthHeaderProvider(
  config: SmartHomeAuthConfig
): RequestHeaderProvider {
  const clock = config.clock ?? systemClock;

  return ({ url }) => ({
    'x-api-key': config.apiKey,
    Hash: createSmartHomeHash(url, config.hmacSecret, clock)
  });
}
