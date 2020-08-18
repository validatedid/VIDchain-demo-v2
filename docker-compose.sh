docker-compose -f docker-compose-redis.yml up -d
cp ../envs/.env.government-frontend implementations/vidchain-government/vidchain-government-frontend/.env
cp ../envs/.env.government-backend implementations/vidchain-government/vidchain-government-backend/.env
cp ../envs/.env.university-frontend implementations/vidchain-university/vidchain-university-frontend/.env
cp ../envs/.env.university-backend implementations/vidchain-university/vidchain-university-backend/.env
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