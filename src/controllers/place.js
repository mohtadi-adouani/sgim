const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag

const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getAllPlaces: ( req, res ) => {

        Place.findAll( {
            limit: 5
        }).then(places => {
            return res.status(200).json({
                places
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
        // get all users
        getOnePlace: ( req, res ) => {

            Place.findOne( {
                where: { id: req.params.id },
                include: [ Tag ],
            }).then(place => {
                return res.status(200).json({
                    place
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },




}