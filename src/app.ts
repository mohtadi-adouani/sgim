const express = require('express')
let app = express(); // création de l'objet représentant notre application express
let port = 8080;

app.use((req, res, next)=> {
    console.log('URL : ' + req.url)
    next()
})

app.get('/', function(req, res) { // création de la route sous le verbe get
    res.send('Hello world  ! ') // envoi de hello world a l'utilisateur
})


app.listen(port, () =>  { // ecoute du serveur sur le port 8080
    console.log('Started on port 8080')
})