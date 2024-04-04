FROM node:14.16.1-alpine

RUN mkdir -p /opt/cqsclient
WORKDIR /opt/cqsclient

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
