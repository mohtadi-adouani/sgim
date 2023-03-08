const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router()
const {
     getUsers,
     getUser,
    //createUser,
    register,
    login,
    getProfile,
    removeUser,
    putUser,
    patchUser,

    } = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------


// get users
router.get('/', auth.verifyToken, getUsers);

router.get('/:id', auth.verifyToken, getUser);

router.post("/register", register); // register
router.post("/login", login); // login

router.put('/:id', auth.verifyToken, putUser);
router.patch('/:id', auth.verifyToken, patchUser);
router.delete('/:id', auth.verifyToken, removeUser);
router.get("/profile/:id", getProfile); // login


// -------------------------EXPORT ROUTER-------------------------
module.exports = router