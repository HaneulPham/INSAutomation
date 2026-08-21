import { test, expect } from '@playwright/test';
import { createSmartHomeHash } from '../../../packages/api/smart-home/auth/smart-home-auth.js';
import { FixedClock } from '../../../packages/core/time/clock.js';

test(
  'Verify the Smart Home Hash matches the approved two-stage HMAC calculation',
  async ({}, testInfo) => {
    testInfo.annotations.push({
      type: 'traceability',
      description: 'R2'
    });

    const requestUrl = new URL(
      'https://smart-home.example.test/api/dispatcher?ignored=true'
    );

    const hash = createSmartHomeHash(
      requestUrl,
      'test-smart-home-secret',
      new FixedClock(new Date('2026-08-21T10:15:59.999Z'))
    );

    expect(hash).toBe('uVMRi6x7JdtxdTnHZP4MwF6d1pTK27r2vRxZdnM8ZFs=');
  }
);
