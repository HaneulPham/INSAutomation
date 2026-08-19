import { redact } from './redaction.js';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogRecord {
  level: LogLevel;
  event: string;
  timestamp: string;
  correlationId?: string;
  data?: unknown;
}

export class Logger {
  constructor(private readonly minimumLevel: LogLevel = 'info') {}

  debug(event: string, data?: unknown, correlationId?: string): void {
    this.write('debug', event, data, correlationId);
  }

  info(event: string, data?: unknown, correlationId?: string): void {
    this.write('info', event, data, correlationId);
  }

  warn(event: string, data?: unknown, correlationId?: string): void {
    this.write('warn', event, data, correlationId);
  }

  error(event: string, data?: unknown, correlationId?: string): void {
    this.write('error', event, data, correlationId);
  }

  private write(
    level: LogLevel,
    event: string,
    data?: unknown,
    correlationId?: string
  ): void {
    const ranks: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };
    if (ranks[level] < ranks[this.minimumLevel]) return;

    const record: LogRecord = {
      level,
      event,
      timestamp: new Date().toISOString()
    };
    if (correlationId) record.correlationId = correlationId;
    if (data !== undefined) record.data = redact(data);

    const output = JSON.stringify(record);
    if (level === 'error') console.error(output);
    else if (level === 'warn') console.warn(output);
    else console.log(output);
  }
}

export const logger = process.env.LOG_LEVEL
  ? new Logger(process.env.LOG_LEVEL as LogLevel)
  : new Logger();
