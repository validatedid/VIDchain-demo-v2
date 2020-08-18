docker-compose -f docker-compose-redis.yml up -d
cp ../envs/.env.government-frontend implementations/vidchain-government/vidchain-government-frontend/.env
cp ../envs/.env.government-backend implementations/vidchain-government/vidchain-government-backend/.env
cp ../envs/.env.university-frontend implementations/vidchain-university/vidchain-university-frontend/.env
cp ../envs/.env.university-backend implementations/vidchain-university/vidchain-university-backend/.env
docker-compose -f implementations/vidchain-government/vidchain-government-frontend/docker-compose.yml up -d --build
docker-compose -f implementations/vidchain-government/vidchain-government-backend/docker-compose.yml up -d --build
docker-compose -f implementations/vidchain-university/vidchain-university-frontend/docker-compose.yml up -d --build
docker-compose -f implementations/vidchain-university/vidchain-university-backend/docker-compose.yml up -d --build
docker-compose -f implementations/landing-page/docker-compose.yml up -d --build