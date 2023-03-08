const express = require('express')
const auth = require('../middleware/auth');

const router = express.Router()
const {
    getPlaces,
    getPlace,

    } = require('../controllers/place')


// -------------------------CUSTOM ROUTE-------------------------



router.get('/', auth.verifyToken,getPlaces);

router.get('/:id', auth.verifyToken,getPlace);



// -------------------------EXPORT ROUTER-------------------------
module.exports = router