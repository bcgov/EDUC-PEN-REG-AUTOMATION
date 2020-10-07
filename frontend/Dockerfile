FROM testcafe/testcafe:latest
USER root
WORKDIR /home/node

COPY package*.json ./

COPY . /home/node
RUN npm install nconf && npm install dotenv && npm install faker

EXPOSE 8080

RUN cd /home/node
RUN npm run staffIssuePenToStudent
