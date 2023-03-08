const jwt = require("jsonwebtoken");
// config env
const config = require('../../config/config');


module.exports = {
    verifyToken : function(req, res, next){
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decoded = jwt.verify(token, config.JWT_SIGN_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    },
    // auth_read_user : async function (req, res, next) {
    //     const user_id = req.user.userId;
    //     const wanted_user_id = req.params.id;
    //     if(!(user_id && wanted_user_id) ){
    //         return res.status(400).send("All params required.");
    //     }
    //     let req_user = await User.findByPk(wanted_user_id);
    //     let wanted_user = await User.findByPk(user_id).then(wanted_user => {
    //             if( req_user.isAdmin ||  )
    //     }).catch(error => {
    //         return res.status(404).send("User not found");
    //     })
    //
    //     try {
    //         const decoded = jwt.verify(token, config.JWT_SIGN_SECRET);
    //         req.user = decoded;
    //     } catch (err) {
    //         return res.status(401).send("Invalid Token");
    //     }
    //     return next();
    // }
}

