import { expect } from '@playwright/test';

export function expectNoUnintendedTriggers(actual: {
  alarms: number;
  notifications: number;
  billingEvents: number;
}): void {
  expect(actual, 'No unrelated alarm, notification, or billing event is created').toEqual({
    alarms: 0,
    notifications: 0,
    billingEvents: 0
  });
}
