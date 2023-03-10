const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router()
const {
     getUsers,
     getUser,
    register,
    login,
    getProfile,
    removeUser,
    putUser,
    patchUser,

    // authorisation
    auth_write_user,
    auth_read_user

    } = require('../controllers/user')

// -------------------------CUSTOM ROUTE-------------------------


// get users
router.get('/', auth.verifyToken, getUsers);

router.get('/:id', auth.verifyToken, auth_read_user, getUser);

router.post("/register", register); // register
router.post("/login", login); // login

router.put('/:id', auth.verifyToken, auth_write_user, putUser);
router.patch('/:id', auth.verifyToken, auth_write_user, patchUser);
router.delete('/:id', auth.verifyToken, auth_write_user, removeUser);
router.get("/profile/:id", auth.verifyToken, getProfile);


// -------------------------EXPORT ROUTER-------------------------
module.exports = router