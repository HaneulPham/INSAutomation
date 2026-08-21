import {test, expect} from '@playwright/test';
test('GET user API', async ({request}) => {
  const response = await request.get('https://telehealthdev.theinsgroup.com.au:4463/api/dispatcher');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('name');
  expect(data).toHaveProperty('email');
})