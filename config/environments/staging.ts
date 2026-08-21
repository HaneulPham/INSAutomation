import { buildEnvironment } from './shared.js';

function stagingUrl(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export function stagingEnvironment() {
  return buildEnvironment('staging', {
    cpWeb: 'https://cp-web.staging.example.invalid',
    cpDesktop: 'https://cp-desktop.staging.example.invalid',
    mobile: 'https://mobile.staging.example.invalid',
    smartHome: stagingUrl(
      'SHM_DOMAIN',
      'https://smart-home.staging.example.invalid'
    ),
    alarm: stagingUrl('ALM_DOMAIN', 'https://alarm.staging.example.invalid'),
    activity: 'https://activity.staging.example.invalid'
  });
}
