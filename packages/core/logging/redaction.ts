const SENSITIVE_KEY =
  /authorization|token|password|pwd|secret|phone|mobile|email|medical|address|imei|deviceId|api[-_]?key|hash|salt|sip|recovery/i;

export function redact(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redact);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        SENSITIVE_KEY.test(key) ? '[REDACTED]' : redact(item)
      ])
    );
  }

  return value;
}
