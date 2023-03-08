const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const { Sequelize } = require('sequelize');
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");
const {user} = require("pg/lib/native");

module.exports = {


    // get all users
    getUsers: ( req, res ) => {

        User.findAll( {
            attributes : ['id','username'],
        }).then(users => {
            return res.status(200).json({
                users
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    // get all users
    getUser: ( req, res ) => {
        User.findOne( {
            where: { id: req.params.id },
            attributes : {exclude: ['password']},
            include: [ {model : Place, as : 'Oplace', attributes : ['id']},
                {model : Place, as : 'Wplace', attributes : ['id']},
                {model : Place, as : 'Rplace', attributes : ['id']},
                {model : Object, as : 'Oobject', attributes : ['id']},
                {model : Object, as : 'Wobject', attributes : ['id']},
                {model : Object, as : 'Robject', attributes : ['id']}]
        }).then(user => {
            return res.status(200).json({
                user
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    getProfile : async (req, res) => {
        const wanted_user_id = req.params.id;

        const wanted_user = await User.findByPk(wanted_user_id);
        if (wanted_user){
            res.status(200).json({ "wanted_user" : wanted_user });
        }
        else{
            res.status(400).json({ "wanted_user" : "Not found" });
        }
    },

    removeUser : async (req, res) => {
        const user_id = req.params.id;

        if (!user_id) {
            return res.status(400).send("All input is required");
        }
            await User.findByPk(user_id).then(user => {
                if(! user){ return res.status(404).json({ message: "User not exist." });}
                User.destroy({where: { id: user_id }}).then( succes => {
                    return res.status(200).json({ message: "User deleted." });
                }).catch( error => {
                    return res.status(500).json({ message : error })
                })
            }).catch(error => {
                return res.status(500).json({ message : error })
            });

    },

    // replace user
    putUser : async (req, res) => {
        try{
            const user_id = req.params.id;
            const user_username = req.body.username;
            const user_email = req.body.email;
            const user_password = req.body.password;

            if (!(user_id && user_username && user_email && user_password)) {
                return res.status(400).send("All input is required");
            }

            await User.findByPk(user_id).then(async user => {
                user.username = user_username;
                user.email = user_email;
                user.password = await bcrypt.hash(user_password, 10);
                user.save().then(user => {
                    return res.status(200).json({user});
                })
            }).catch(error => {
                return res.status(404).json({"message" : "User not found"});
            });
        } catch (error) {
            return res.status(500).json({"message" : error});
        }
    },

    // patch user
    patchUser : async (req, res) => {
        try{
            const user_id = req.params.id;
            const user_username = req.body.username;
            const user_email = req.body.email;
            const user_password = req.body.password;


            await User.findByPk(user_id).then(async user => {
                user_username ? user.username = user_username : "";
                user_email ? user.email = user_email : "";
                user_password ? user.password = await bcrypt.hash(user_password, 10) : "";
                user.save().then(user => {
                    return res.status(200).json({user});
                })
            }).catch(error => {
                return res.status(404).json({"message" : "User not found"});
            });
        } catch (error) {
            return res.status(500).json({"message" : error});
        }
    },



    // register
    register : async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const {username, email, password} = req.body;
        // Validate user input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({where: { email: email }});

        if (oldUser) {
            return res.status(409).send("User with this email already exist. Please Login");
        }


        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username : username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        let new_token = jwtUtils.generateTokenForUser(user);

        // return new user
        return res.status(201).json({
            userId: user.id,
            token : new_token
        });
    }
    catch (err) {
        console.log(err);
    }
    },
    // Our login logic starts here
    login : async (req, res) => {
        try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
    res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({where: { email: email }});

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const new_token = jwtUtils.generateTokenForUser(user);

        // user
        res.status(200).json({token : new_token});
    }
    res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
    }

}