const express = require('express')
const router = express.Router()
const {
     getAllPlaces,
     getOnePlace,

    } = require('../controllers/place')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/places/',
    getAllPlaces
)

router.get('/place/:id',
    getOnePlace
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router