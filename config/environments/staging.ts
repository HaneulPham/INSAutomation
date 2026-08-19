import { buildEnvironment } from './shared.js';

export function stagingEnvironment() {
  return buildEnvironment('staging', {
    cpWeb: 'https://cp-web.staging.example.invalid',
    cpDesktop: 'https://cp-desktop.staging.example.invalid',
    mobile: 'https://mobile.staging.example.invalid',
    smartHome: 'https://smart-home.staging.example.invalid',
    alarm: 'https://alarm.staging.example.invalid',
    activity: 'https://activity.staging.example.invalid'
  });
}
