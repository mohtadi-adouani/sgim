const jwt = require("jsonwebtoken");
// config env
const config = require('../../config/config');

module.exports = {
    generateTokenForUser : function (user) {
        return jwt.sign({
            userId : user.id,
            isAdmin : user.isAdmin
        },
            config.JWT_SIGN_SECRET,
            {
                expiresIn: "2h",
            });
    }
}

