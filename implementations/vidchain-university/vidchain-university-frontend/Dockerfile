# Stage 0: prepare node alpine image
FROM node:12-alpine AS base
RUN apk add --update --no-cache \
  python \
  make \
  g++

## Stage 1: build the wallet 
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./ /usr/src/app/
EXPOSE 3024

# Finally run the application
CMD [ "npm", "start" ]