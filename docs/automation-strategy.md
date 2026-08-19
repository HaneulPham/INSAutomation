# Automation strategy

Prioritize client safety, privacy, data integrity, notification routing, alarms, billing,
jobs, queues, idempotency, and recovery. Automate stable, observable behavior at the lowest
reliable layer: domain rules first, API contracts second, UI journeys only where presentation
or cross-platform behavior is material.

Suites are grouped by platform and business risk. Framework smoke tests are isolated and
must pass without network access. Live tests require explicit activation and approved data.
