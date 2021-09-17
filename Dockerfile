FROM node:12.22.3-alpine3.14
WORKDIR /app/
COPY . . 
RUN npm i
EXPOSE 3000 
CMD [ "npm", "run", "start" ]

