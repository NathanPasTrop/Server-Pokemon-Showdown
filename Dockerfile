FROM node:20

WORKDIR /pokemon-showdown

COPY package*.json ./
RUN npm install

EXPOSE 8001

RUN echo "=== CONTENU DE / ===" && ls -R /

CMD ["node", "pokemon-showdown", "start"]
