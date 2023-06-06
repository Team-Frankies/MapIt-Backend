FROM node:latest

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

ENTRYPOINT [ "nodemon","--inspect=0.0.0.0","./src/main.js" ]

EXPOSE 3000

CMD ["npm", "run", "dev"]