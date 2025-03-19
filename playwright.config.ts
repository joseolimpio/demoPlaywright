import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  expect: {
    timeout: 5000
  },
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    launchOptions: {
      args: ['--disable-web-security'], // Flag para desativar o CORS
    },
  },
  reporter: [['html'], ['line']]
});