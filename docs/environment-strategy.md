# Environment strategy

`dev` and `staging` support live execution when explicitly enabled. Mutations require a second,
separate approval flag. `production-readonly` permits only safe read requests and cannot be
overridden by the mutation flag.

Endpoints and credentials are environment variables. Placeholder `.invalid` hostnames prevent
accidental calls when staging or production URLs have not been configured. Secrets belong in
the execution platform's secret store or local ignored `.env` file.
