docker-compose -f docker-compose-redis.yml up -d
docker-compose -f implementations/vidchain-government/vidchain-government-frontend/docker-compose.yml up -d --build
docker-compose -f implementations/vidchain-government/vidchain-government-backend/docker-compose.yml up -d --build
docker-compose -f implementations/vidchain-university/vidchain-university-frontend/docker-compose.yml up -d --build
docker-compose -f implementations/vidchain-university/vidchain-university-backend/docker-compose.yml up -d --build
docker-compose -f implementations/landing-page/docker-compose.yml up -d --build