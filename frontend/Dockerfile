FROM node:18 as builder

RUN mkdir /app
WORKDIR /app

COPY ./*.json /app
COPY ./*.html /app
COPY ./*.js /app
COPY ./src /app/src
COPY ./public /app/public

RUN npm install