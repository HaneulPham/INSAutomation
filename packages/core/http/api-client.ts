import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { ExecutionPolicy } from '../environment/execution-policy.js';
import { assertLiveExecutionAllowed } from '../environment/environment-guard.js';
import { assertRequestAllowed } from '../environment/mutation-guard.js';
import type { TokenProvider } from '../auth/token-provider.js';
import { newCorrelationId } from '../logging/correlation.js';
import { logger } from '../logging/logger.js';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface OutgoingRequest {
  method: HttpMethod;
  url: URL;
}

export type RequestHeaderProvider = (
  request: OutgoingRequest
) => Record<string, string> | Promise<Record<string, string>>;

export interface RequestOptions {
  method?: HttpMethod;
  data?: unknown;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

export interface ApiResult<T> {
  status: number;
  ok: boolean;
  body: T;
  correlationId: string;
  response: APIResponse;
}

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
    private readonly policy: ExecutionPolicy,
    private readonly tokenProvider: TokenProvider,
    private readonly requestHeaderProvider?: RequestHeaderProvider
  ) {}

  async send<T>(path: string, options: RequestOptions = {}): Promise<ApiResult<T>> {
    const method = options.method ?? 'GET';
    assertLiveExecutionAllowed(this.policy);
    assertRequestAllowed(method, this.policy);

    const correlationId = newCorrelationId();
    const token = await this.tokenProvider.token();
    const requestUrl = new URL(path, this.baseUrl);
    const generatedHeaders = this.requestHeaderProvider
      ? await this.requestHeaderProvider({ method, url: requestUrl })
      : {};
    const headers: Record<string, string> = {
      accept: 'application/json',
      'x-correlation-id': correlationId,
      ...options.headers,
      // Generated headers are authoritative and cannot be overridden by a test.
      ...generatedHeaders
    };
    if (token) headers.authorization = `Bearer ${token}`;

    logger.info('api.request', { method, path, params: options.params }, correlationId);
    const response = await this.request.fetch(requestUrl.toString(), {
      method,
      headers,
      ...(options.data === undefined ? {} : { data: options.data }),
      ...(options.params === undefined ? {} : { params: options.params })
    });
    const body = (await parseBody(response)) as T;
    logger.info('api.response', { method, path, status: response.status() }, correlationId);

    return {
      status: response.status(),
      ok: response.ok(),
      body,
      correlationId,
      response
    };
  }
}

async function parseBody(response: APIResponse): Promise<unknown> {
  const contentType = response.headers()['content-type'] ?? '';
  if (contentType.includes('application/json')) return response.json();
  const text = await response.text();
  return text || null;
}
