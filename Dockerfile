# syntax=docker/dockerfile:1

FROM node:16-alpine

WORKDIR /automatisch

RUN apk add g++ make python3

COPY . ./

RUN yarn
RUN yarn lerna bootstrap
RUN yarn lerna run --scope=@*/{web,docs,workshop,backend,cli} build

COPY ./docker/entrypoint-cloud.sh /entrypoint-cloud.sh

EXPOSE 8080
ENTRYPOINT ["sh", "/entrypoint-cloud.sh"]
