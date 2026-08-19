# Security and privacy strategy

Validate UI and API authorization, tenant boundaries, client-file isolation, direct URL access,
expired tokens, restricted evidence, and export permissions. Tests must verify that a denial
does not persist data or trigger downstream events.

Logs are redacted by key and generated artifacts are ignored by Git. Treat screenshots, traces,
videos, payloads, and reports as sensitive even in test environments. Store only the minimum
evidence required and follow the approved retention process for the execution environment.
