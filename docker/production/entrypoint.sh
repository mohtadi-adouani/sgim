#!/bin/sh
export NODE_ENV="production"
npx sequelize-cli db:migrate --env production
echo "Migration __________OK"
npx sequelize-cli db:seed:undo:all --env production
npx sequelize-cli db:seed:all --env production
echo "Seed __________OK"
npm run start:production