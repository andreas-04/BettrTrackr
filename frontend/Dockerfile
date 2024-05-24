FROM node:latest
RUN mkdir /code
WORKDIR /code

COPY . /code/
RUN npm install @mui/joy
RUN npm install react-router-dom
RUN npm install axios
RUN npm install js-cookie
RUN npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
EXPOSE 5173

CMD [ "npm", "run", "dev" ]
