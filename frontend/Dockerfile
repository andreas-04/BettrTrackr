FROM node:latest
RUN mkdir /code
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm ci
COPY . /code
EXPOSE 5173

CMD [ "npm", "run", "dev" ]
