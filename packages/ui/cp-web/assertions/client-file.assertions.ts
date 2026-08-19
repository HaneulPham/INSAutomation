import { expect, type Page } from '@playwright/test';

export async function expectClientFileIdentity(page: Page, clientFileId: string): Promise<void> {
  await expect(page.getByTestId('client-file-id')).toHaveText(clientFileId);
}
