const express = require('express')
const router = express.Router()
const {
    getObjects,
    getObject,

    } = require('../controllers/object')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/',
    getObjects
)

router.get('/:id',
    getObject
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router