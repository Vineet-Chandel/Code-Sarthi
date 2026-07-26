export default {
  topics: [
    {
      id: "images-containers",
      title: "Images & Containers",
      sections: [
        {
          heading: "Container lifecycle",
          description: "Images are blueprints; containers are running instances. Images are immutable.",
          language: "bash",
          code: `# Pull an image
docker pull node:20-alpine
docker pull postgres:16

# Run a container
docker run -d \\
  --name my-app \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  node:20-alpine

# Run interactively
docker run -it --rm node:20-alpine sh

# List containers
docker ps              # running
docker ps -a           # all (including stopped)

# Stop / start / restart
docker stop  my-app
docker start my-app
docker restart my-app

# Remove
docker rm my-app       # container (must be stopped)
docker rmi node:20-alpine  # image`,
        },
        {
          heading: "Exec & logs",
          description: "exec opens a shell inside a running container; logs tails its output.",
          language: "bash",
          code: `# Open a shell inside a running container
docker exec -it my-app sh
docker exec -it my-app bash

# Run a one-off command
docker exec my-app node --version
docker exec my-app cat /etc/os-release

# View logs
docker logs my-app
docker logs -f my-app        # follow (tail -f equivalent)
docker logs --tail 100 my-app

# Copy files
docker cp my-app:/app/dist ./dist
docker cp ./config.json my-app:/app/config.json`,
        },
      ],
    },
    {
      id: "dockerfile",
      title: "Dockerfile",
      sections: [
        {
          heading: "Writing a Dockerfile",
          description: "Each instruction creates a layer. Order instructions from least to most frequently changing to maximise cache hits.",
          language: "bash",
          code: `# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

# Install deps first (changes least often — best cache hit)
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build stage
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image (smallest possible)
FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/dist         ./dist
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]`,
        },
        {
          heading: "Build & tag images",
          description: "Build locally and push to a registry for deployment.",
          language: "bash",
          code: `# Build (tag = name:version)
docker build -t my-app:latest .
docker build -t my-app:1.2.0 --target runner .

# Build with build args
docker build --build-arg API_URL=https://api.example.com -t my-app .

# Tag existing image
docker tag my-app:latest registry.io/myorg/my-app:1.2.0

# Push to registry
docker login registry.io
docker push registry.io/myorg/my-app:1.2.0

# Inspect image layers
docker history my-app:latest
docker image inspect my-app:latest`,
        },
      ],
    },
    {
      id: "compose",
      title: "Docker Compose",
      sections: [
        {
          heading: "docker-compose.yml",
          description: "Compose defines multi-container apps declaratively. One file, one command.",
          language: "yaml",
          code: `version: "3.9"
services:
  web:
    build: .
    ports:  ["3000:3000"]
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./src:/app/src   # dev: live reload

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB:       myapp
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s

volumes:
  pg_data:`,
        },
        {
          heading: "Compose commands",
          description: "All compose commands operate on the services defined in docker-compose.yml.",
          language: "bash",
          code: `# Start all services (detached)
docker compose up -d

# Start and rebuild images
docker compose up -d --build

# Stop (keep containers)
docker compose stop

# Stop and remove containers + networks
docker compose down

# Stop and remove everything including volumes
docker compose down -v

# Logs for all / one service
docker compose logs -f
docker compose logs -f web

# Shell into a service
docker compose exec web sh

# Run one-off command
docker compose run --rm web npm run db:migrate`,
        },
      ],
    },
    {
      id: "networking",
      title: "Networking & Volumes",
      sections: [
        {
          heading: "Networks",
          description: "Containers on the same network reach each other by service name (not IP).",
          language: "bash",
          code: `# Create a network
docker network create my-net

# Connect container to network
docker run -d --name web --network my-net my-app
docker run -d --name db  --network my-net postgres:16

# Web can now reach DB as: postgres://db:5432
# No need to expose ports between containers

# Inspect network
docker network inspect my-net

# List all networks
docker network ls`,
        },
        {
          heading: "Volumes",
          description: "Named volumes persist data across container restarts; bind mounts share host directories.",
          language: "bash",
          code: `# Create and use a named volume
docker volume create pg_data
docker run -d -v pg_data:/var/lib/postgresql/data postgres:16

# Bind mount (host path → container path)
docker run -v $(pwd)/src:/app/src node:20-alpine

# Read-only bind mount
docker run -v $(pwd)/config.json:/app/config.json:ro my-app

# List / inspect / remove volumes
docker volume ls
docker volume inspect pg_data
docker volume rm pg_data

# Remove all unused volumes
docker volume prune`,
        },
      ],
    },
  ],
};
