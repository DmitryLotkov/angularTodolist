# Stage 1: сборка приложения Angular
FROM node:latest AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

VOLUME ["/usr/src/app/data"]

RUN yarn build

# Stage 2: настройка сервера Nginx и развертывание приложения
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/todo /usr/share/nginx/html

ENV PORT 3000

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]

