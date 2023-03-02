const express = require('express')
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
// router import
const user = require('./routes/user')
const place = require('./routes/place')
const object = require('./routes/object')
const tag = require('./routes/tag')

// config env
const config = require('../config/config');


// APP
let app = express(); // création de l'objet représentant notre application express
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
// Routing tags
app.use('/api', tag)

app.listen(config.api_port, () =>  { // ecoute du serveur sur le port 8001
    console.log('Started on port ' + config.api_port)
})