const express = require('express')
const router = express.Router()
const {
     getAllUsers,
     deleteAllUsers,

    } = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/users/',
    getAllUsers
)


router.delete('/removeAllUsers/',
deleteAllUsers
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router