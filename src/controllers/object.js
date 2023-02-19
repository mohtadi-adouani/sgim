const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getAllObjects: ( req, res ) => {

        Object.findAll( {
            limit: 5
        }).then(objects => {
            return res.status(200).json({
                objects
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
        // get all users
        getOneObject: ( req, res ) => {

            Place.findOne( {
                where: { id: req.params.id },
            }).then(object => {
                return res.status(200).json({
                    object
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },




}