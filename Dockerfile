FROM node:14.15.3-slim

WORKDIR /code

COPY package.json package-lock.json firebase-admin.json ./
RUN npm install