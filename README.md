# websniff_backend

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database](#database)
- [Hosting](#hosting)
- [Things to Learn](#for-nico-things-to-learn-about-in-no-particular-order)

## Getting Started

- Install [Node.js](https://nodejs.org/en/download/)
- Install Yarn: `npm install -g yarn`
- Install Postgres and create a database (There is a [Postgres.app](https://postgresapp.com/) for Mac
- Clone the repository: `git clone ...`
- Install dependencies: `yarn install` in the root directory of the cloned repo
- Create a .env file with the connection URL of the PostGres database in a variable called `DATABASE_URL`
- To build the project: `yarn build`
- To run the project: `yarn start`
- To run the project in development mode: `yarn dev`

## Project Structure

- `src` - Contains the source code of the project
  - `index.ts` - The entry point of the project
  - `candidate.ts` - The router for endpoints related to candidates (e.g. `/candidates`)
  - `photometry.ts` - The router for endpoints related to photometry (e.g. `/photometry`)
- `prisma` - Contains the database schema and migrations
  - `schema.prisma` - The database schema. This is used to generate the database schema and the typescript types
  - `migrations` - Contains the migrations for the database schema
- `dist` - Contains the compiled code of the project

## Database

- TODO: figure out db provider w/ Nico

## Hosting

- TODO: figure out hosting provider w/ Nico

## For Nico: Things to Learn About (in no particular order)

- [ ] [Prisma](https://www.prisma.io/)
- [ ] [TypeScript](https://www.typescriptlang.org/)
- [ ] [Express](https://expressjs.com/)
- [ ] [Postgres](https://www.postgresql.org/)
- [ ] [Node.js](https://nodejs.org/en/)
- [ ] [Yarn](https://yarnpkg.com/)
- [ ] [Postman](https://www.postman.com/)
