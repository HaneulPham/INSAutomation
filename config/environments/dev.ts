import { buildEnvironment } from './shared.js';

export function devEnvironment() {
  return buildEnvironment('dev', {
    cpWeb: 'http://127.0.0.1:3000',
    cpDesktop: 'http://127.0.0.1:3001',
    mobile: 'http://127.0.0.1:4723',
    smartHome: 'http://127.0.0.1:4000',
    alarm: 'http://127.0.0.1:4001',
    activity: 'http://127.0.0.1:4002'
  });
}
