#!/bin/sh
export NODE_ENV="test"
npx sequelize-cli db:migrate --env test
echo "Migration __________OK"
npx sequelize-cli db:seed:undo:all --env test
npx sequelize-cli db:seed:all --env test
echo "Seed __________OK"
npm run start:test

