import type { CreateClientConfig } from '@hey-api/client-axios';

console.log('process.env.VERCEL_ENV=', process.env.VERCEL_ENV);
console.log('process.env.VERCEL_URL=', process.env.VERCEL_URL);
console.log('process.env.VERCEL_BRANCH_URL=', process.env.VERCEL_BRANCH_URL);


export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: process.env.VERCEL_ENV 
    ? '' 
    : 'http://localhost:8080'
});
