#!/bin/sh
export NODE_ENV="development"
npx sequelize-cli db:migrate
echo "Migration __________OK"
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:all
echo "Seed __________OK"
npm run start:development