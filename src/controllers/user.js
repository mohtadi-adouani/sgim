const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const { Sequelize } = require('sequelize');
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");

module.exports = {

    // add user
    createUser: async (req, res) => {
        const user1 = await User.create({
            username: 'Mohtadi',
            email: 'Mohtadi@isiam.fr',
            password: 'test password',
        });

        const cuisine = await Place.create({
            name: 'Cuisine'
        });
        const frigo = await Place.create({
            name: 'Frigo'
        });
        const placard = await Place.create({
            name: 'placard'
        });
        const fourchette = await Object.create({
            name: 'frouchette'
        });
        const cuillere = await Object.create({
            name: 'cuillere'
        });

        placard.setParent(cuisine);
        frigo.setParent(cuisine);

        fourchette.setPlace(placard);
        cuillere.setPlace(placard);

        placard.addObject(fourchette);
        placard.addObject(cuillere);


        return res.status(200).json({
            user1
        })
    },
    // get all users
    getAllUsers: ( req, res ) => {

        User.findAll( {
            attributes : ['id','username'],
            limit: 5
        }).then(users => {
            return res.status(200).json({
                users
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
        // get all users
        getOneUser: ( req, res ) => {
            User.findOne( {
                where: { id: req.params.id },
                attributes : {exclude: ['password']},
                include: [ Place, Object ]
            }).then(user => {
                return res.status(200).json({
                    user
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },



    // delete all users

    deleteAllUsers: (req, res) => {
        User.destroy({
            truncate: true
          }).then(() => {
            return res.status(200).json({
                success: true,
                "message": "All Users deleted"
            })
          }).catch(err => {
              return res.status(400).json({
                  err
              })
          })
},

registerUser : async (req, res) => {
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
    loginUser : async (req, res) => {
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