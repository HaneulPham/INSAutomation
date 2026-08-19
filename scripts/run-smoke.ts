import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['playwright', 'test', '--project=framework-smoke'], {
  stdio: 'inherit',
  env: process.env
});
process.exit(result.status ?? 1);
