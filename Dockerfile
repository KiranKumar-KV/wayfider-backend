FROM node:carbon-alpine

WORKDIR /wayfinder-back-end

COPY package.json /wayfinder-back-end

RUN npm install --quiet

COPY . /wayfinder-back-end