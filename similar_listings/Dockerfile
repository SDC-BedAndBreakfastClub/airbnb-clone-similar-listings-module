FROM node:8.12

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 3003

CMD ["npm", "start"]