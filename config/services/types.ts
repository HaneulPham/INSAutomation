export interface RemoteServiceConfig {
  baseUrl: string;
  timeoutMs: number;
  enabled: boolean;
}

export type ServiceName =
  | 'smartHome'
  | 'alarm'
  | 'twilio'
  | 'sms'
  | 'fcm'
  | 'carer'
  | 'activity'
  | 'billing'
  | 'stock';

export type ServiceConfig = Record<ServiceName, RemoteServiceConfig>;
