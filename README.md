# MERN Based TODO APP 
TODO app running inside docker container's

#### How to run it locally:-
1.	clone project into local machine
```
$ git clone https://github.com/ishank-katiyar/TODO
```
2. 
```
$ cd TODO
```
3. Go to mongodb atlas and create new database and grab its connection URI, username and password.
4.	
```
$ cd backend and touch .env
```
5. open the project in your favourite text editor.
6. edit .env file as 
```
PORT=<-- port number (eg. 5000) -->
MONGO_ST=<-- mongodb URI -->
DB_USERNAME=<-- database username -->
DB_PASSWORD=<-- database password -->
```
7.	build docker images
```
$ docker build -t todo-backend -f docker/Dockerfile .
$ cd ../frontend/ && docker build -t todo-frontend -f docker/Dockerfile .
```
8. Now for the final step, run both images.
```
$ docker run -p 5000:5000 todo-backend
$ docker run -p 3000:3000 todo-frontend 
```
9. Now open your favourite browser, and got to http://localhost:3000/