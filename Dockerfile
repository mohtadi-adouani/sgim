FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
EXPOSE 4000
EXPOSE 5000
CMD [ "npx", "sequelize-cli", "db:migrate:undo:all" ]
CMD [ "npx", "sequelize-cli", "db:migrate:all" ]
CMD [ "npm", "run", "start:development" ]
#CMD [ "npx", "sequelize-cli", "db:seed:all" ]

