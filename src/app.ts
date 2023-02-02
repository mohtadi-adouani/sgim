const express = require('express')
let app = express(); // création de l'objet représentant notre application express
let port = 8001;

const { Sequelize } = require('sequelize');

// DATABASE connection
const sequelize = new Sequelize('postgres://admin:admin@localhost:5432/sgim_db');
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


app.use((req, res, next)=> {
    console.log('URL : ' + req.url)
    next()
})

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send('Hello world  ! ') // envoi de hello world a l'utilisateur
})


app.listen(port, () =>  { // ecoute du serveur sur le port 8001
    console.log('Started on port ' + port)
})