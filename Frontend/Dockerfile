
# This the docker file of the CodeSarthi Frontend

# We know that the project is of the Node.js so rather than creating the Docker image on the top of unbuntu or scratch we will create on the top of node.js

FROM node:22-alpine AS builder

# | Image            |    Size    | Best Use Case   |
# | ---------------- | ---------- | --------------- |
# | node:22          | 1.1–1.3 GB | Development     |
# | node:22-bookworm | 1.0–1.2 GB | General purpose |
# | node:22-slim     | 220–300 MB | Production      |
# | node:22-alpine   | 60–90 MB   | Lightweight     |

WORKDIR /CodeSarthi-Frontend

# now the work of copying the file to image arises,
# there is the command as -- 
# COPY . . 
# here 
# (.) --> it tells about the current directory from where we are building the image 
# and 
# another (.) --> it tells about the directory inside the image we are copying the code to
# so it means copy all the files from current directory to the image

# but the thing is that we don't need to copy all the files to the image and this is the main flaw of this command
# example:- 
# .gitignore, .env, README.md, .git, node_modules, dist, build, etc
# this are some files that we don't need to copy to the image

# to get rid of it the .dockerignore file is created
COPY package*.json ./

# installing all the dependencies
# use npm ci instead of npm install for faster and more reliable installations
RUN npm ci

# copy the rest files
COPY . . 

# converting the files so that browser could understand the files
RUN npm run build


FROM nginx:alpine
COPY --from=builder /CodeSarthi-Frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]