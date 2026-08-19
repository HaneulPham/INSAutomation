import type { PlatformConfig } from '../platforms/types.js';
import type { ServiceConfig } from '../services/types.js';

export type EnvironmentName = 'dev' | 'staging' | 'production-readonly';

export interface EnvironmentConfig {
  name: EnvironmentName;
  production: boolean;
  mutationsAllowed: boolean;
  platforms: PlatformConfig;
  services: ServiceConfig;
}
