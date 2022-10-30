FROM node:16.15.1-alpine
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD npm start