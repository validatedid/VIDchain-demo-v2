# University backend demo

By cloning this repository, you can run the university backend demo locally.

## How to run the demo locally

Create your *.env* file copying *.env.example* and update *BASE_URL* parameter. This parameter must be updated with the enpoint where **vidchain-university-backend** can be found. In *.env.example* the backend is tunneled through ngrok to the localhost running the backend as well.


Once you have cloned this repository and updated the parameter mentioned above, you can run the demo by either running node or building and starting a container.

### Node

Obtain the necessary dependencies so the artifacts can be build and run:

```
npm install
npm run build
npm run start
```

### Docker

Build your local image by running:

```
docker build -t vidchain/university-backend:v0.1 .
docker images
```

Run the container:

```
docker run --name myapp -it -d -p 127.0.0.1:3021:3021 vidchain/university-backend:v0.1
docker ps
```