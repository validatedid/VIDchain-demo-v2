# VIDchain-demo-v2

Repository with the webs used to demo the VIDchain-v2 app: https://github.com/validatedid/VIDchain-v2

It contains 3 projects:
 - vidchain-government-app to simulate a government issuing a Identity Credential.
 - vidchain-university-app to simulate a university issuing a Verifiable Credential of a diploma.
 - vidchain-jobs-app to simulate the process of applying to a job, using the credentials issued for the institutions above and issue a VC of the job.


# Testing projects locally
Is using ngrok to run the 3 projects locally and use them to test the mobile app:

To run it create a configuration file with the 3 servers in: /Users/your-user/.ngrok2/ngrok.yml

Run the command:
```bash
 ./ngrok start --all
```
 Copy the URL of the 3 servers and create an .env file in each of the 3 Clients (vidchain-government-frontend, vidchain-jobs-frontend, vidchain-university-frontend) with a variable:
    BACKEND_URL="paste-the-url"