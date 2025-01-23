FROM node:20.5.0 AS stage.build

ARG APP_ENV
RUN npm config set registry https://registry.npmmirror.com
WORKDIR /app
COPY . .
RUN npm ci --force
RUN  echo "Building for environment: $APP_ENV"
RUN npm run build:${APP_ENV}

# copy nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=stage.build /app/dist .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
