
# Système de gestion d'inventaire maison
This project aims to implement a home inventory management system



## Authors
- [@asbelmir](https://www.gitlab.com/asbelmir)
- [@easow](https://www.gitlab.com/easow)
- [@hddembele](https://www.gitlab.com/hddembele)
- [@mafracso](https://www.gitlab.com/mafracso)
- [@moadouani](https://www.gitlab.com/moadouani)

# Required 
**Docker compose:** [Docker](https://www.docker.com/)

**Node js 12.0.0 >= :** [Nodejs](https://nodejs.org/)

    
# Download and install

Clone the project

```bash
  git clone https://gitlab.isima.fr/easow/sgim
```

Go to the project directory

```bash
  cd sgim
```

Install dependencies

```bash
  npm install
```

Create databases
```bash
  # create database production
  npx sequelize-cli db:create --env production
  # create database development
  npx sequelize-cli db:create --env development
  # create database test
  npx sequelize-cli db:create --env test
```
Undo and do migration
```bash
   # undo production migration
   npx sequelize-cli db:migrate:undo:all --env production 
   # undo development  migration
   npx sequelize-cli db:migrate:undo:all --env development
   # undo test  migration
   npx sequelize-cli db:migrate:undo:all --env test 
   
   # do production migration
   npx sequelize-cli db:migrate --env production
   # do development migration
   npx sequelize-cli db:migrate --env development
   # do test migration
   npx sequelize-cli db:migrate --env test
```

# Run 
Start docker

```bash
  docker compose up -d
```

Start the server production

```bash
  npm run start:production
  # or development
  npm run start:development
```



# Migration
undo last migration
```bash
  npx sequelize-cli db:migrate:undo --env [YOUR ENV] 
```
undo all migration
```bash
  npx sequelize-cli db:migrate:undo:all --env [YOUR ENV]
```
migrate
```bash
  npx sequelize-cli db:migrate --env [YOUR ENV]
```

## Tech Stack

**Server:** Node, Express, TypeScript

**ORM:** [Sequelize](https://sequelize.org/)

