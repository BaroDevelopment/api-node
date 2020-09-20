FROM node:12-alpine
EXPOSE 50000
WORKDIR /home/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD ["npx", "nodemon", "-L", "src/index.ts"]