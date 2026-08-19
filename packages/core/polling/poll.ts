export async function pollUntil<T>(
  read: () => Promise<T>,
  accept: (value: T) => boolean,
  options: { timeoutMs: number; intervalMs: number }
): Promise<T> {
  const deadline = Date.now() + options.timeoutMs;
  let value = await read();
  while (!accept(value)) {
    if (Date.now() >= deadline) throw new Error(`Polling timed out after ${options.timeoutMs}ms`);
    await new Promise((resolve) => setTimeout(resolve, options.intervalMs));
    value = await read();
  }
  return value;
}
