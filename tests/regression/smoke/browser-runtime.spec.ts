import { test, expect } from '@playwright/test';

test('Verify the configured Chromium runtime can render a local test page', async ({ page }) => {
  await page.setContent('<main><h1>INS LifeGuardian automation ready</h1></main>');
  await expect(page.getByRole('heading')).toHaveText('INS LifeGuardian automation ready');
});
