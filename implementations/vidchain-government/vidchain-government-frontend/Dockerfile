# Stage 0: prepare node alpine image
FROM node:12-alpine AS demo
RUN apk add --update --no-cache \
  python \
  make \
  g++

## Stage 1: build the demo 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY . /usr/src/app/

RUN npm run build

# Stage 2: run nginx
FROM nginx
RUN mkdir -p /app
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
  chown -R nginx:nginx /var/cache/nginx && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid
USER nginx
COPY --from=demo /usr/src/app /app
COPY --from=demo /app /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/conf.d/nginx.conf 
RUN rm /etc/nginx/nginx.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 3022
CMD ["nginx", "-g", "daemon off;"]

