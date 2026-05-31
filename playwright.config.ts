import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: {
    // All requests we send go to this API endpoint.
    baseURL: 'https://api.restful-api.dev',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      //     },
    }
  }
});