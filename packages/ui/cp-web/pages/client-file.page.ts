import type { Page } from '@playwright/test';

export class ClientFilePage {
  constructor(private readonly page: Page) {}

  async open(clientFileId: string): Promise<void> {
    await this.page.goto(`/client-files/${encodeURIComponent(clientFileId)}`);
  }

  async displayedStatus(): Promise<string> {
    return (await this.page.getByTestId('client-status').textContent())?.trim() ?? '';
  }
}
