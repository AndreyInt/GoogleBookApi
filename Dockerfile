FROM node:17-alpine
WORKDIR /test
COPY package.json ./
RUN npm install
COPY . .n
EXPOSE 3000
CMD ["npm", "start"]