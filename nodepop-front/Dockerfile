# FROM node:20-alpine as dev
# WORKDIR /app
# COPY package.json package.json
# RUN npm install
# CMD ["npm", "run", "dev"]

FROM node:20-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

# FROM node:20-alpine as prod-deps
# WORKDIR /app
# COPY package.json package.json
# RUN npm install --prod --frozen-lockfile --network-timeout 6000000

# FROM node:20-alpine as prod

