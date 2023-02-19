const express = require('express')
const router = express.Router()
const {
     getAllObjects,
     getOneObject,

    } = require('../controllers/object')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/objects/',
    getAllObjects
)

router.get('/object/:id',
    getOneObject
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router