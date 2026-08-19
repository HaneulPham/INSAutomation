import { access } from 'node:fs/promises';

const requiredPaths = [
  'config/environments',
  'config/platforms',
  'config/services',
  'packages/core',
  'packages/domain',
  'packages/api',
  'packages/ui',
  'packages/integrations',
  'packages/persistence',
  'packages/observability',
  'fixtures',
  'factories',
  'schemas',
  'tests/api',
  'tests/cp-web',
  'tests/cp-desktop',
  'tests/mobile',
  'tests/integration',
  'tests/regression',
  'traceability',
  'references/postman',
  'scripts',
  'output',
  'docs'
];

await Promise.all(requiredPaths.map((path) => access(path)));
console.log(`Structure validation passed: ${requiredPaths.length} required areas found`);
