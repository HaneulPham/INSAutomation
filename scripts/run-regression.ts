import { spawnSync } from 'node:child_process';

const projects = process.env.REGRESSION_PROJECTS?.split(',').filter(Boolean) ?? [
  'framework-smoke',
  'safety-critical'
];
const args = ['playwright', 'test', ...projects.map((project) => `--project=${project}`)];
const result = spawnSync('npx', args, { stdio: 'inherit', env: process.env });
process.exit(result.status ?? 1);
