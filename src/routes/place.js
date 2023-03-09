const express = require('express')
const auth = require('../middleware/auth');

const router = express.Router()
const {
    getPlaces,
    getPlace,
    postPlace,
    putPlace,
    patchPlace,
    removePlace,

    // authorization
    auth_read_place,
    auth_write_place

    } = require('../controllers/place')


// -------------------------CUSTOM ROUTE-------------------------


// classic routes
router.get('/', auth.verifyToken,getPlaces);
router.get('/:id', auth.verifyToken, auth_read_place, getPlace);
router.post('/', auth.verifyToken,postPlace);
router.put('/:id', auth.verifyToken,auth_write_place, putPlace);
router.patch('/:id', auth.verifyToken,auth_write_place, patchPlace)
router.delete('/:id', auth.verifyToken,auth_write_place, removePlace)


// customized routes

// -------------------------EXPORT ROUTER-------------------------
module.exports = router