export interface TokenProvider {
  token(): Promise<string | undefined>;
}

export class EnvironmentTokenProvider implements TokenProvider {
  async token(): Promise<string | undefined> {
    return process.env.INS_API_TOKEN || undefined;
  }
}
