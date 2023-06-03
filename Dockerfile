#STAGE 1
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/sample-app /usr/share/nginx/html