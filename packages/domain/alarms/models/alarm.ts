export interface Alarm {
  id: string;
  clientFileId: string;
  status: 'open' | 'acknowledged' | 'restored';
  source: 'welfare-check' | 'device' | 'manual';
  correlationId: string;
}
