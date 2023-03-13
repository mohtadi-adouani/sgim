// Mise en cache

module.exports = {
    setCache : function(req, res, next){
        // Mettre en cache la réponse pendant 5 minutes
        res.set('Cache-Control', 'public, max-age=300');
        res.setHeader('x-cache', 'MISS');
        //res.send('Données de l\'API');
        next();
    }
}