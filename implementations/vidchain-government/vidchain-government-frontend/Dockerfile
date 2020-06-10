# Stage 0: prepare node alpine image
FROM node:12-alpine AS base
RUN apk add --update --no-cache \
  python \
  make \
  g++

## Stage 1: build the wallet 
FROM base AS builder-demo
WORKDIR /app
COPY ./package*.json ./
COPY package-lock.json ./
RUN npm ci --quiet --no-progress
COPY . ./
RUN npm run build

# Stage 2: run nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3022
CMD ["nginx", "-g", "daemon off;"]

