const express = require('express')
const auth = require('../middleware/auth');

const router = express.Router()
const {
    getPlaces,
    getPlace,
    postPlace,

    } = require('../controllers/place')


// -------------------------CUSTOM ROUTE-------------------------



router.get('/', auth.verifyToken,getPlaces);
router.post('/', auth.verifyToken,postPlace);
router.get('/:id', auth.verifyToken,getPlace);

//router.put('/:id', auth.verifyToken,putPlace):
//router.patch('/:id', auth.verifyToken,getObject)
//router.delete('/:id', auth.verifyToken,getObject)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router