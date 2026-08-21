export interface TokenProvider {
  token(): Promise<string | undefined>;
}

export class EnvironmentTokenProvider implements TokenProvider {
  async token(): Promise<string | undefined> {
    return process.env.INS_API_TOKEN || undefined;
  }
}

export class NoTokenProvider implements TokenProvider {
  async token(): Promise<string | undefined> {
    return undefined;
  }
}

export class RequiredEnvironmentTokenProvider implements TokenProvider {
  constructor(private readonly variableName: string) {}

  async token(): Promise<string | undefined> {
    const value = process.env[this.variableName]?.trim();

    if (!value) {
      throw new Error(`${this.variableName} must contain a Bearer token`);
    }

    return value;
  }
}

export class StaticTokenProvider implements TokenProvider {
  constructor(private readonly value: string) {}

  async token(): Promise<string | undefined> {
    if (!this.value.trim()) {
      throw new Error('The runtime Bearer token cannot be empty');
    }

    return this.value;
  }
}
