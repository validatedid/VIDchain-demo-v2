# University demo frontend

By cloning this repository, you can run the university frontend demo locally by two means: running node or by building a container.

## How to run the demo
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