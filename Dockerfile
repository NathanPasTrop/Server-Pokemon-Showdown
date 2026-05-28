FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN ls -R /app

EXPOSE 8001

CMD ["node", "pokemon-showdown", "start"]
