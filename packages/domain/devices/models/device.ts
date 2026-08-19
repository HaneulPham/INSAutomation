export interface Device {
  id: string;
  clientFileId: string;
  type: 'safety-watch' | 'smart-home-mini' | 'smart-tracker' | 'peripheral';
  status: 'online' | 'offline' | 'removed';
}
