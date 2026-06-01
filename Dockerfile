FROM node:20

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "=== CONTENU DE /app ===" && ls -R /app

EXPOSE 8001

CMD ["node", "pokemon-showdown", "start"]
