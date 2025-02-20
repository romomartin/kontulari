FROM node:23-alpine3.20

WORKDIR /accounts-api

COPY ./jest.config.ts ./jest.config.ts
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./server.ts ./server.ts

RUN npm install
CMD ["npm","run","dev"]