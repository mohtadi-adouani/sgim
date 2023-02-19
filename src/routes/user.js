const express = require('express')
const router = express.Router()
const {
     getAllUsers,
     deleteAllUsers,
     getOneUser,

    } = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/users/',
    getAllUsers
)

router.get('/user/:id',
    getOneUser
)


router.delete('/removeAllUsers/',
deleteAllUsers
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router