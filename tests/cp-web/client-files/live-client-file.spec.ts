import { test, expect } from '@playwright/test';
import { ClientFilePage } from '../../../packages/ui/cp-web/pages/client-file.page.js';

test('Verify an authorized user can reopen the configured client file', async ({ page }) => {
  test.skip(process.env.RUN_LIVE_TESTS !== 'true', 'Set RUN_LIVE_TESTS=true to run live UI tests');
  test.skip(!process.env.INS_CLIENT_FILE_ID, 'INS_CLIENT_FILE_ID is required');
  test.skip(!process.env.INS_STORAGE_STATE, 'INS_STORAGE_STATE must identify approved auth state');

  const clientFile = new ClientFilePage(page);
  await clientFile.open(process.env.INS_CLIENT_FILE_ID!);

  await expect(page.getByTestId('client-file-id')).toHaveText(process.env.INS_CLIENT_FILE_ID!);
});
