# University backend demo

By cloning this repository, you can run the university backend demo locally.

## How to run the demo locally

Create your _.env_ file copying _.env.example_ and update _BASE_URL_ parameter. This parameter must be updated with the enpoint where **vidchain-university-backend** can be found. In _.env.example_ the backend is tunneled through ngrok to the localhost running the backend as well. To do so, install [ngrok](https://ngrok.com/) in your machine and run in your terminal:

```
./ngrok http 3021
```

Then, the enpoint provided by ngrok tunneling your localhost service will be shown.

Once you have updated the parameter mentioned above, you can run the demo by either running node or building and starting a container.

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
