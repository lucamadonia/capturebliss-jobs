FROM node:18.16.1 AS base

WORKDIR /usr/capturebliss-jobs

COPY package*.json ./
RUN npm install
COPY . .

FROM base as builder
WORKDIR /usr/capturebliss-jobs
RUN npm run tscv
RUN npm run gen
RUN npm run build

FROM node:18-alpine3.18
RUN apk add graphicsmagick
WORKDIR /usr/capturebliss-jobs
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/capturebliss-jobs ./

EXPOSE 8081
ENTRYPOINT ["yarn","start"]
