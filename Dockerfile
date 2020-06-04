FROM node

ENV HOME=/app

RUN mkdir /app

RUN apt-get update

COPY package.json $HOME

WORKDIR $HOME

RUN npm install && npm install -g nodemon

EXPOSE 3333

# ENTRYPOINT [ "nodemon", "server.js" ]
CMD [ "npm" ,"start","-s"]