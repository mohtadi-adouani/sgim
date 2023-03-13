
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


    
# Download and install

Clone the project
```bash
  git clone https://gitlab.isima.fr/easow/sgim
```
Go to the project directory
```bash
  cd sgim/docker/production/
```
Build Dockerfile
```bash
  docker compose build
```
Run
```bash
  docker compose up
```
Stop [same directory]
```bash
  docker compose down
```
Now you can test your API.


## Start dev env 
```bash
  cd sgim/docker/development/
```
Build Dockerfile
```bash
  docker compose build
```
Run
```bash
  docker compose up
```
Stop [same directory]
```bash
  docker compose down
```

## start test
```bash
  cd sgim/docker/test/
```
Build Dockerfile
```bash
  docker compose build
```
Run
```bash
  docker compose up (without -d to see details)
```
Stop [same directory]
```bash
  docker compose down
```

## Tech Stack

**Server:** Node, Express, TypeScript

**ORM:** [Sequelize](https://sequelize.org/)

