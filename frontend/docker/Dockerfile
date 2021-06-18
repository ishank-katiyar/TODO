FROM node as react-build

RUN apt update && apt install curl vim -y

WORKDIR /app

COPY . .

RUN npm install && npm install react-scripts && npm run build



FROM nginx:1.19.9-alpine

RUN apk --no-cache add gettext

COPY --from=react-build /app/build /usr/share/nginx/html/build

RUN rm /etc/nginx/nginx.conf && rm -rf /etc/nginx/conf.d

COPY nginx/* /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
