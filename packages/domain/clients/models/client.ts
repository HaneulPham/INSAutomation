export interface Client {
  id: string;
  clientFileId: string;
  tenantId: string;
  displayName: string;
  status: 'active' | 'suspended';
}
