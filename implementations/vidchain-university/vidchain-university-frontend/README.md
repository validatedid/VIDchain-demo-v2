# University frontend demo

By cloning this repository, you can run the university frontend demo locally.

## How to run the demo locally

Create your *.env* file copying *.env.example* and update *REACT_APP_BACKEND_URL* parameter with the backend of this demo url (see **vidchain-university-backend**). This parameter must be updated with the enpoint where **vidchain-university-backend** can be found. In *.env.example* the backend is tunneled through ngrok to the localhost running the backend as well.

### Node

Once you have cloned this repository, obtain the necessary dependencies so the artifacts can be build and run:

```
npm install
npm run build
npm run start
```

### Docker

Once you have cloned this repository, build your local image by running:

```
docker build -t vidchain/university-frontend:v0.1 .
docker images
```

Once build you can run the container:
```
docker run --name myapp -it -d -p 127.0.0.1:3024:3024 vidchain/university-frontend:v0.1
docker ps
```

## Access through your browser

In any of the cases you have decided to use, you can now find in your browser this React Native application at:

```
127.0.0.1/demo
```