import { buildEnvironment } from './shared.js';

export function productionReadonlyEnvironment() {
  return buildEnvironment(
    'production-readonly',
    {
      cpWeb: 'https://cp-web.production.example.invalid',
      cpDesktop: 'https://cp-desktop.production.example.invalid',
      mobile: 'https://mobile.production.example.invalid',
      smartHome: 'https://smart-home.production.example.invalid',
      alarm: 'https://alarm.production.example.invalid',
      activity: 'https://activity.production.example.invalid'
    },
    true
  );
}
