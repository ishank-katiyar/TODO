FROM node

RUN apt update && apt install curl vim -y

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

EXPOSE 5000

CMD ["npm","start"]