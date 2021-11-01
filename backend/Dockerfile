FROM node:14

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn

EXPOSE 8080

RUN yarn config set scripts-prepend-node-path true