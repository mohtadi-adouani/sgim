const express = require('express')
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
// router import
const user = require('./routes/user');
const place = require('./routes/place');
const object = require('./routes/object');
const tag = require('./routes/tag')

// config env
const config = require('../config/config')[process.env.NODE_ENV];

// Cache
import cacheController from 'express-cache-controller';

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

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
    res.send('Hello world p  ! ') // envoi de hello world a l'utilisateur
})

// Routing users
app.use('/api/users', user);
// Routing places
app.use('/api/places', place);
// Routing objects
app.use('/api/objects', object);
// Routing tags
app.use('/api/tags', tag);

app.listen(config.api_port, () =>  { // ecoute du serveur sur le port 8001
    console.log('Started on port ' + config.api_port)
})

// Ajout du middleware de cache
app.use(cacheController({
    maxAge: 60 // Durée de vie maximale du cache en secondes
}));

//Fichier de journalisation access.log
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Utiliser le middleware de journalisation "morgan" pour enregistrer les informations de cache
app.use(morgan('combined', {
    skip: (req, res) => {
      // Ne pas enregistrer les requêtes qui ont retourné des données en cache
      return res.getHeader('x-cache') !== undefined;
    }
  }));

// Mise en cache
app.get('/api/users', (req, res) => {
    // Mettre en cache la réponse pendant 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    res.setHeader('x-cache', 'MISS');
    res.send('Données de l\'API');
});

app.get('/api/places', (req, res) => {
    // Mettre en cache la réponse pendant 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    res.setHeader('x-cache', 'MISS');
    res.send('Données de l\'API');
});

app.get('/api/objects', (req, res) => {
    // Mettre en cache la réponse pendant 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    res.setHeader('x-cache', 'MISS');
    res.send('Données de l\'API');
});

app.get('/api/tags', (req, res) => {
    // Mettre en cache la réponse pendant 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    res.setHeader('x-cache', 'MISS');
    res.send('Données de l\'API');
});