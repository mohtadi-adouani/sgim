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
    },
    verifyToken : function(req, res, next){
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decoded = jwt.verify(token, JWT_SIGN_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    }
}

