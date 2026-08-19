export type EvidenceAccess =
  | 'tester-accessible'
  | 'developer-supported'
  | 'operations-supported'
  | 'not-available';

export interface TestEvidence {
  type: 'ui' | 'api' | 'database' | 'notification' | 'queue' | 'job' | 'audit' | 'report';
  access: EvidenceAccess;
  correlationId?: string;
  description: string;
  location?: string;
}
