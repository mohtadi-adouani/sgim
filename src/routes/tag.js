const express = require('express')
const router = express.Router()
const {
     getAllTags,
     getOneTag,

    } = require('../controllers/tag')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/tags/',
    getAllTags
)

router.get('/tag/:id',
    getOneTag
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router