import { test, expect } from '@playwright/test';
import { devEnvironment } from '../../../config/environments/dev.js';
import { productionReadonlyEnvironment } from '../../../config/environments/production-readonly.js';
import { executionPolicy } from '../../../packages/core/environment/execution-policy.js';
import { assertLiveExecutionAllowed } from '../../../packages/core/environment/environment-guard.js';
import { assertRequestAllowed } from '../../../packages/core/environment/mutation-guard.js';
import { redact } from '../../../packages/core/logging/redaction.js';
import { validateSchedule } from '../../../packages/domain/tasks/rules/schedule.rules.js';
import { completionSuppressesEscalation } from '../../../packages/domain/tasks/rules/completion.rules.js';

test.describe('Automation framework safety checks', () => {
  test('Verify live service execution requires explicit activation', () => {
    const policy = executionPolicy(devEnvironment());
    if (policy.liveTestsEnabled) test.skip(true, 'Live execution was explicitly enabled for this run');
    expect(() => assertLiveExecutionAllowed(policy)).toThrow(/RUN_LIVE_TESTS/);
  });

  test('Verify production-readonly blocks every mutation request', () => {
    const policy = executionPolicy(productionReadonlyEnvironment());
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      expect(() => assertRequestAllowed(method, policy)).toThrow(/production-readonly/);
    }
    expect(() => assertRequestAllowed('GET', policy)).not.toThrow();
  });

  test('Verify non-production mutations require explicit approval', () => {
    const policy = executionPolicy(devEnvironment());
    if (policy.mutationsAllowed) test.skip(true, 'Mutation approval was explicitly enabled for this run');
    expect(() => assertRequestAllowed('POST', policy)).toThrow(/ALLOW_MUTATIONS/);
  });

  test('Verify sensitive fields are redacted from evidence logs', () => {
    expect(
      redact({
        clientFileId: 'safe-test-id',
        email: 'person@example.test',
        nested: { authorization: 'Bearer secret', status: 'delivered' }
      })
    ).toEqual({
      clientFileId: 'safe-test-id',
      email: '[REDACTED]',
      nested: { authorization: '[REDACTED]', status: 'delivered' }
    });
  });

  test('Verify invalid reminder and escalation ordering is rejected', () => {
    const errors = validateSchedule({
      dueAt: '2030-01-01T10:00:00.000Z',
      reminderAt: '2030-01-01T10:01:00.000Z',
      escalationAt: '2030-01-01T09:59:00.000Z',
      timezone: 'Australia/Sydney'
    });
    expect(errors).toEqual([
      'Reminder time must be earlier than due time',
      'Escalation time cannot be earlier than due time'
    ]);
  });

  test('Verify completion before escalation suppresses escalation', () => {
    expect(
      completionSuppressesEscalation(
        new Date('2030-01-01T10:00:00.000Z'),
        new Date('2030-01-01T10:05:00.000Z')
      )
    ).toBe(true);
  });
});
