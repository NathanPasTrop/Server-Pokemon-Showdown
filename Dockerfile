FROM node:20

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8001

CMD ["node", "pokemon-showdown", "start"]
