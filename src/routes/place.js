const express = require('express')
const router = express.Router()
const {
    getPlaces,
    getPlace,

    } = require('../controllers/place')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/',
    getPlaces
)

router.get('/:id',
    getPlace
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router