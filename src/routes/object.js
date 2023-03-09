const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const {
    getObjects,
    getObject,

    } = require('../controllers/object')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/', getObjects)

router.get('/:id', getObject)

//router.put('/:id', auth.verifyToken,getObject)
//router.patch('/:id', auth.verifyToken,getObject)
//router.delete('/:id', auth.verifyToken,getObject)
//router.post('/:id', auth.verifyToken,getObject)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router