# Stage 1: build the React app
FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Baked in at build time. "/" makes the browser call /api/... on the same origin (nginx).
ARG REACT_APP_API_URL=/
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Stage 2: serve the static build with nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
