# VIDchain-demo-v2

Repository with the webs used to demo the VIDchain-v2 app: https://github.com/validatedid/VIDchain-v2

It contains 3 projects:
 - vidchain-government-app to simulate a government issuing a Identity Credential.
 - vidchain-university-app to simulate a university issuing a Verifiable Credential of a diploma, when the user enrolls into a course using his Identity Credential.
 - vidchain-jobs-app to simulate the process of applying to a job, using the credentials issued for the institutions above and issue a VC of the job.

# Getting started

You can choose to run the project locally with your own Node.js environment, or you can use Docker Compose to run it.

First, create an `.env` file locally in the project you want to run. You can duplicate `.env.example` and name the new copy `.env`. Adapt the variables to your needs.

In each one of the projects, there is a README, with a explanation about how to run it locally or using Docker.


# Testing projects locally
Is using ngrok to run the 3 projects locally and use them to test the mobile app:

To run it create a configuration file with the 3 servers in: /Users/your-user/.ngrok2/ngrok.yml

Run the command:
```bash
 ./ngrok start --all
```
 Copy the URL of the 3 servers and create an variable in the .env file in each of the 3 proyects (vidchain-government, vidchain-jobs, vidchain-university).

# Run the DB locally
The demo app vidchain-government uses Redis to store the information of the user after the registration, to run it locally.

  ```bash
  docker-compose -f docker-compose-redis.yml up -d 
  ```

### Run All the projects via Docker

To run all the projects, adapt the variables to your needs in the docker-compose.yml of all projects, and run:
```sh
sh docker-compose.sh
```