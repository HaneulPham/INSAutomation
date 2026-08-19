import { z } from 'zod';
import { apiPlatform } from '../platforms/api.js';
import { cpDesktop } from '../platforms/cp-desktop.js';
import { cpWeb } from '../platforms/cp-web.js';
import { lifeguardMobile } from '../platforms/lifeguard-mobile.js';
import { service } from '../services/service.js';
import type { EnvironmentConfig, EnvironmentName } from './types.js';

const url = z.string().url();

function readUrl(name: string, fallback: string): string {
  return url.parse(process.env[name] ?? fallback);
}

export function buildEnvironment(
  name: EnvironmentName,
  defaults: {
    cpWeb: string;
    cpDesktop: string;
    mobile: string;
    smartHome: string;
    alarm: string;
    activity: string;
  },
  production = false
): EnvironmentConfig {
  const smartHomeUrl = readUrl('SMART_HOME_API_URL', defaults.smartHome);
  const alarmUrl = readUrl('ALARM_API_URL', defaults.alarm);
  const activityUrl = readUrl('ACTIVITY_API_URL', defaults.activity);
  const mutationsRequested = process.env.ALLOW_MUTATIONS === 'true';

  return {
    name,
    production,
    mutationsAllowed: !production && mutationsRequested,
    platforms: {
      cpWeb: cpWeb(readUrl('CP_WEB_BASE_URL', defaults.cpWeb)),
      cpDesktop: cpDesktop(readUrl('CP_DESKTOP_BASE_URL', defaults.cpDesktop)),
      lifeguardMobile: lifeguardMobile(
        readUrl('LIFEGUARD_MOBILE_BASE_URL', defaults.mobile)
      ),
      api: apiPlatform(smartHomeUrl)
    },
    services: {
      smartHome: service(smartHomeUrl),
      alarm: service(alarmUrl),
      activity: service(activityUrl),
      twilio: service(readUrl('TWILIO_API_URL', `${smartHomeUrl}/twilio`), false),
      sms: service(readUrl('SMS_API_URL', `${smartHomeUrl}/sms`), false),
      fcm: service(readUrl('FCM_API_URL', `${smartHomeUrl}/fcm`), false),
      carer: service(readUrl('CARER_API_URL', `${smartHomeUrl}/carer`), false),
      billing: service(readUrl('BILLING_API_URL', `${smartHomeUrl}/billing`)),
      stock: service(readUrl('STOCK_API_URL', `${smartHomeUrl}/stock`))
    }
  };
}
