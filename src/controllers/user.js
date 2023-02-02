const User = require('../models').User

module.exports = {

    // get all users

    getAllUsers: ( req, res ) => {

        User.findAll( {
            attributes: ['id', 'firstName', 'lastName', 'email'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(users => {
            return res.status(200).json({
                users
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