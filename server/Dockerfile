FROM node:latest
WORKDIR /usr/source/app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm install -g sequelize-cli
CMD npm run migrate; node index.js;