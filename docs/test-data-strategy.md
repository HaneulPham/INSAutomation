# Test data strategy

Use synthetic tenant, village, client-file, contact, device, and task data. Factories create
safe defaults; builders express scenario-specific changes; schemas validate fixtures and API
responses. A run ID should prefix data that may require cleanup.

Do not copy production names, health details, phone numbers, emails, addresses, notification
content, screenshots, or identifiers into this repository. Cleanup must target only records
created by the current automation run.
