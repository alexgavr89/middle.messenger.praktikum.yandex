FROM node:16-alpine

WORKDIR /var/www
COPY ./ ./

RUN npm install
RUN npm run build

CMD [ "node", "./server.js" ]