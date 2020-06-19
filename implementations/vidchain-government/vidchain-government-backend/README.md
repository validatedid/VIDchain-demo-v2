# Demo City

This repository contains the code of the backend of a city website to demostrate the interaction with the Vidchain mobile application.

# Getting started

You can choose to run the project locally with your own Node.js environment, or you can use Docker Compose to run it.

First, create an `.env` file locally. You can duplicate `.env.example` and name the new copy `.env`. Adapt the variables to your needs.

### Run the project locally

Install the required libraries and packages dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run start
```

This command starts the web app at http://localhost:3021/backenddemo

You can create a production build with:

```sh
npm run build
```
### Run demo-homepage with Docker

Adapt the variables to your needs in the docker-compose and run:

```sh
docker-compose up --build
```
You can do requests to http://localhost:3021/backenddemo