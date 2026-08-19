# Traceability strategy

Use stable identifiers: `R` for requirements, `D` for confirmed decisions, `A` for active QA
assumptions, `RK` for material risks, and `GAP` for unresolved coverage dependencies. Test IDs
follow `<Ticket>-G<Group>-<Sequence>`.

Copy `traceability/tickets/TICKET.template.json` for each Jira ticket. Every automated case must
map to at least one supported requirement, decision, assumption, or risk. Do not mark a
requirement covered until all applicable UI, API, persistence, integration, audit, privacy,
failure, and compatibility layers have evidence.
