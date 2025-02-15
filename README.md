# Leads Table App

![Alt text](/screenshot.png?raw=true)

## Project Structure

The sturcture of the project follows the template repo: https://github.com/digitros/nextjs-fastapi to make it easier to deploy on Vercel for a `Next.js` + `FastApi` full stack setup.

## Setup

The binaries are managed using [Hermit](https://cashapp.github.io/hermit/). The activation of hermit is added in the `.envrc` file. Run the below command to activate the environment.

```
direnv allow
```

## Steps to serve locally

1. Run `Postgres` docker contain

```
make db-start
```

2. Run backend server.

```
make run-server
```

3. Run frontend server in dev mode or build/start.

```
npm run dev
```

4. Seed data. You will be prompted to input number of leads to seed.

```
make db-seed
```

5. Tear down

```
db-reset
db-stop
kill servers
```

Go to http://localhost:3000 and play around.

## Backend server client

Generated the backend server client in Typescript using `openapi-ts`.

## UI lib

[Mantine](https://mantine.dev/)
