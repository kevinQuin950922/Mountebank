#Se crea la imagen base
FROM node:22-alpine
RUN  mkdir -p /home/node/mountebank/node_modules && chown -R node:node /home/node/mountebank
WORKDIR /home/node/mountebank
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 5000 5001 5002
USER node
CMD ["npm", "start"]







