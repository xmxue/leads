import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8080/openapi.json',
  output: 'api-client',
  plugins: ['@hey-api/client-axios'],
});