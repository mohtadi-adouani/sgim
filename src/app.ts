const express = require('express')
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
// router import
const user = require('./routes/user')
const place = require('./routes/place')
const object = require('./routes/object')

// DATABASE connection
const sequelize = new Sequelize('postgres://admin:admin@localhost:5432/sgim_db');
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// APP
let app = express(); // création de l'objet représentant notre application express
let port = 8001;
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next)=> {
    console.log('URL : ' + req.url)
    next()
})

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send('Hello world  ! ') // envoi de hello world a l'utilisateur
})

// Routing users
app.use('/api', user)
// Routing places
app.use('/api', place)
// Routing objects
app.use('/api', object)

app.listen(port, () =>  { // ecoute du serveur sur le port 8001
    console.log('Started on port ' + port)
})