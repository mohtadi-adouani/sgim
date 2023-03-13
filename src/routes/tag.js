const express = require('express')
const cache = require('../cache/cache.all');
const router = express.Router()
const {
     getTags,
     getTag,

    } = require('../controllers/tag')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/',
    cache.setCache,
    getTags
)

router.get('/:id',
    getTag
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router