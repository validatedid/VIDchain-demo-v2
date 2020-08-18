docker-compose -f docker-compose-redis.yml up -d
cd implementations/vidchain-government/vidchain-government-frontend
docker-compose -f docker-compose.yml up -d --build
cd ../vidchain-government-backend
docker-compose -f docker-compose.yml up -d --build
cd ../../vidchain-university/vidchain-university-frontend
docker-compose -f docker-compose.yml up -d --build
cd ../vidchain-university-backend
docker-compose -f docker-compose.yml up -d --build
cd ../../landing-page
docker-compose -f docker-compose.yml up -d --build