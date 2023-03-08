const express = require('express')
const router = express.Router()
const {
     getTags,
     getTag,

    } = require('../controllers/tag')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/',
    getTags
)

router.get('/:id',
    getTag
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router