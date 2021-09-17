
## Description

This is a technical challenge for a NodeJS Developer position 

## Creating the database
to setup the database go to db folder and run $ sudo docker-compose up, this will create a mysql server running in a container exposing port 3306.

if for some reason you have conflicts with the mysql ports, in the docker-compose.yml file located in the db folder, change the port option from 3306:3306 to 3307:3306


## Running the app

- Clone the repo in your local machine
- run npm install
- run npm run start


You can also run $ sudo docker compose up in the root folder to run the app without further configurations
```
