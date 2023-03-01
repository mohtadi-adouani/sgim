const express = require('express')
const router = express.Router()
const {
     getAllUsers,
     deleteAllUsers,
     getOneUser,
    createUser

    } = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------



router.get('/users/',
    getAllUsers
)

router.get('/user/:id',
    getOneUser
)

router.post('/user/',
    createUser
)
router.delete('/removeAllUsers/',
deleteAllUsers
)



// -------------------------EXPORT ROUTER-------------------------
module.exports = router