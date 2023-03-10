const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const {
    getObjects,
    getObject,

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


router.get('/', getObjects)
router.get('/:id', auth_read_object, getObject)

//router.put('/:id', auth.verifyToken,getObject)
//router.patch('/:id', auth.verifyToken,getObject)
//router.delete('/:id', auth.verifyToken,getObject)
//router.post('/:id', auth.verifyToken,getObject)




// -------------------------EXPORT ROUTER-------------------------
module.exports = router