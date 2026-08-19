# Contribution guide

1. Place business rules in `packages/domain` and transport details in `packages/api` or
   `packages/integrations`.
2. Add or update Zod schemas for external contracts.
3. Build privacy-safe data through factories and builders.
4. Add a self-contained rule/guard test and the appropriate live test if the endpoint exists.
5. Record Jira traceability and evidence ownership.
6. Run `npm run validate` before review.

Do not commit `.env`, credentials, live client data, or generated evidence.
