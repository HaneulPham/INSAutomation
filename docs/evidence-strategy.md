# Evidence strategy

Prefer tester-accessible evidence: UI state, API response, received test notification, activity
history, audit history, report, or export. Use correlation IDs and timestamps to join evidence.

If a queue, database, job, provider payload, retry record, or DLQ record is essential but not
accessible, label it developer-supported or operations-supported and state the exact artifact
required. A requirement remains partially covered when an applicable outcome layer cannot be
observed.
