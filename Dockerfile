FROM node:16-alpine

ARG MONGODB_URI
ARG ELASTIC_APM_SERVICE_NAME
ARG ELASTIC_APM_SECRET_TOKEN
ARG ELASTIC_APM_SERVER_URL

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY ../../app/hello.js ./server.js

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm install express cors mongodb generate-password nodemailer

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]