# API mapping

API clients are grouped by service rather than test suite. `smart-home` currently provides task,
task-occurrence, device, billing, and linking-code adapters. Alarm and activity have separate
clients. Add request and response schemas before expanding live coverage.

Every mutating adapter delegates to the shared API client, so production-readonly and explicit
mutation approval apply consistently. Avoid raw service calls from tests unless validating the
transport wrapper itself.
