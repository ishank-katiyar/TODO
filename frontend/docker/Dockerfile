FROM node as react-build

RUN apt update

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]