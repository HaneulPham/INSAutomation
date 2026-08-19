export function formatInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: timezone,
    dateStyle: 'short',
    timeStyle: 'medium',
    hour12: false
  }).format(date);
}
