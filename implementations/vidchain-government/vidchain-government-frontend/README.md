# Government frontend demo

## Before running the demo

Create your _.env_ file copying _.env.example_ and update _REACT_APP_BACKEND_URL_ and BACKEND*WS parameters with the backend of this demo url (see **vidchain-government-backend**). This parameter must be updated with the enpoint where **vidchain-government-backend** can be found. In *.env.example\_ the backend is tunneled through ngrok to the localhost running the backend as well.

Once you have updated the parameter mentioned above, you can run the demo by either running node or building and starting a container.

### Running Node

Obtain the necessary dependencies so the artifacts can be build and run:

```
npm install
npm run build
npm run start
```

### Running Docker

Build your local image by running:

```
docker build -t vidchain/government-frontend:v0.1 .
docker images
```

Run the container:

```
docker run --name myapp -it -d -p 127.0.0.1:3022:3022 vidchain/government-frontend:v0.1
docker ps
```

## Access through your browser

In any of the cases you have decided to use, you can now find in your browser this React Native application at:

```
127.0.0.1:3022/demo/govenrment/
```
