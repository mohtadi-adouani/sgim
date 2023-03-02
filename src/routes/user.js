const express = require('express')
const router = express.Router()
const {
     getAllUsers,
     deleteAllUsers,
     getOneUser,
    createUser,
    registerUser,
    loginUser

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

router.post("/register/",
// our register logic goes here...
    registerUser
);

// Login
router.post("/login",
// our login logic goes here
    loginUser
);


// -------------------------EXPORT ROUTER-------------------------
module.exports = router