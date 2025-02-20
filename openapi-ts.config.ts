import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'openapi.json',
  output: 'api-client',
  plugins: [
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: './hey-api.ts', 
    },
  ],
});