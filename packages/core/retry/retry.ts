export interface RetryOptions {
  attempts: number;
  delayMs: number;
  retryWhen?: (error: unknown, attempt: number) => boolean;
}

export async function retry<T>(operation: () => Promise<T>, options: RetryOptions): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= options.attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === options.attempts || options.retryWhen?.(error, attempt) === false) break;
      await new Promise((resolve) => setTimeout(resolve, options.delayMs));
    }
  }
  throw lastError;
}
