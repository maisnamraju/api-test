## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Setup 
- copy `.env.example` to `.env`
- run `docker-compose up `
app will now run on the port in the env file 

## Migration Commands 
- `npm run migration:generate <filepath>` to create a migration script
- `npm run migration:run` to run migrations scripts 
- `npm run migration:rollback` to rollover migration

## Installation and running

```bash
$ npm install
```
Copy content of `.env.example` to `.env` and run `docker-compose up` to start application in dev mode

Run `docker exec -it main /bin/bash` to ssh into the dev container and npm run commands on the fly  

## Test

```bash
# unit tests
$ npm run test

```