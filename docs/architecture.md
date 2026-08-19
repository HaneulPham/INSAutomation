# Architecture

Dependencies flow inward: tests use UI/API adapters; adapters use core transport and domain
contracts; domain rules remain independent of Playwright and external services. Environment
policy is evaluated before a request. Every request receives a correlation ID and logs only
redacted metadata.

Provider-specific evidence belongs under `packages/integrations`; persistence and operational
evidence adapters belong under `packages/persistence` and `packages/observability`. This keeps
test expectations observable without embedding infrastructure credentials in test cases.
