const User = require('../models').User
const Place = require('../models').Place
const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getAllUsers: ( req, res ) => {

        User.findAll( {
            attribute : ['is','username'],
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
                attribute : ['id','username'],
                include: [{
                                model: Place,
                                as : 'Places'
                              }]
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




}