import 'dotenv/config';
import { z } from 'zod';
import { devEnvironment } from './dev.js';
import { productionReadonlyEnvironment } from './production-readonly.js';
import { stagingEnvironment } from './staging.js';
import type { EnvironmentConfig } from './types.js';

const environmentName = z
  .enum(['dev', 'staging', 'production-readonly'])
  .default('dev');

export function loadEnvironment(): EnvironmentConfig {
  const name = environmentName.parse(process.env.TEST_ENV);

  switch (name) {
    case 'dev':
      return devEnvironment();
    case 'staging':
      return stagingEnvironment();
    case 'production-readonly':
      return productionReadonlyEnvironment();
  }
}
