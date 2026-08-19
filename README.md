# INS LifeGuardian Automation

A safety-aware TypeScript and Playwright framework for INS LifeGuardian API, CP Web,
CP Desktop, mobile, integration, and regression automation.

The repository separates environment policy, domain rules, transport clients, platform
objects, test data, evidence, and Jira traceability. This prevents test code from mixing
business expectations with service implementation details.

## Safety defaults

- Live service tests are skipped unless `RUN_LIVE_TESTS=true`.
- Mutating API methods are blocked unless `ALLOW_MUTATIONS=true` in a non-production environment.
- `production-readonly` blocks `POST`, `PUT`, `PATCH`, and `DELETE` regardless of other flags.
- Tokens, passwords, email addresses, phone fields, and authorization headers are redacted from logs.
- Real healthcare or client data must not be committed to fixtures, reports, screenshots, or traces.

## Quick start

```bash
npm install
npm run setup:browsers
cp .env.example .env
npm run validate
```

Browser installation is needed for CP Web tests, but not for API-only or framework checks.
`npm run validate` performs TypeScript checking, directory validation, fixture schema
validation, and isolated framework smoke tests. It does not call INS services.

## Running live tests

Configure approved non-production endpoints and credentials in `.env`. Then enable only
the intended run:

```bash
RUN_LIVE_TESTS=true npm run test:api
RUN_LIVE_TESTS=true npm run test:cp-web
```

For an approved test that creates or updates data in dev or staging:

```bash
TEST_ENV=staging RUN_LIVE_TESTS=true ALLOW_MUTATIONS=true npm run test:api
```

Never enable mutations against `production-readonly`; the runtime guard rejects them.

## Structure

| Area | Responsibility |
|---|---|
| `config/` | Environments, platforms, services, and Playwright projects |
| `packages/core/` | HTTP, auth, retry, time, IDs, logging, policy, and shared assertions |
| `packages/domain/` | INS entities, rules, builders, and lifecycle behavior |
| `packages/api/` | Typed clients grouped by backend service |
| `packages/ui/` | Page/screen objects, workflows, and platform assertions |
| `packages/integrations/` | Provider and AWS messaging evidence adapters |
| `packages/observability/` | Evidence contracts for alarms, jobs, queues, notifications, and reports |
| `fixtures/`, `factories/`, `schemas/` | Privacy-safe test data creation and contract validation |
| `tests/` | API, platform, integration, and risk-based regression suites |
| `traceability/` | Requirement, decision, assumption, risk, gap, and test mappings |
| `output/` | Generated reports and evidence; content is ignored by Git |

## Test authoring rules

- Start each title with `Verify` and give the test one primary observable outcome.
- Include the Jira-style test ID and traceability IDs in annotations or the test body.
- Assert persisted state and relevant non-triggers, not only UI success messages.
- Use correlation IDs to connect API, queue, job, notification, activity, and audit evidence.
- Label unavailable evidence as developer-supported or operations-supported.
- Keep production read-only and use privacy-safe synthetic data in every non-production fixture.

See `docs/` for architecture, environment, evidence, privacy, test-data, traceability, and
contribution guidance.
