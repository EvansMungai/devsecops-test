# --- Stage 1: Build Only ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build the Angular application for production
RUN npm run build -- --configuration=production

## --- Stage 2: Production Environment ---
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf && rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/uhb/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]