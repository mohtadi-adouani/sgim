const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = 'kqdjqklsdiuoeuoaizuzu';

module.exports = {
    generateTokenForUser : function (user) {
        return jwt.sign({
            userId : user.id,
            isAdmin : user.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: "2h",
            });
    }
}
