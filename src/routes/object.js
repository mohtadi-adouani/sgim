const express = require('express');
const auth = require('../middleware/auth');
const cache = require('../cache/cache.all');

const router = express.Router()
const {
    getObjects,
    getObject,
    removeObject,
    putObject,
    patchObject,
    postObject,

    // authorization
    auth_read_object,
    auth_write_object,

    // recherche
    getObjectByName,
    getObjectByTag

    } = require('../controllers/object')

// -------------------------CUSTOM ROUTE-------------------------

// recherche
router.get('/findbyname', auth.verifyToken, getObjectByName)
router.get('/findbytag', auth.verifyToken, getObjectByTag)


router.get('/', cache.setCache,getObjects)
router.get('/:id', auth.verifyToken, auth_read_object, getObject)

router.delete('/:id', auth.verifyToken,auth_write_object, removeObject)

router.put('/:id', auth.verifyToken,auth_write_object,putObject)
router.patch('/:id', auth.verifyToken,auth_write_object,patchObject)
router.post('/', auth.verifyToken,postObject)




// -------------------------EXPORT ROUTER-------------------------
module.exports = router