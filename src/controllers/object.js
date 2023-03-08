const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag
const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getObjects: ( req, res ) => {

        Object.findAll( {
            attributes: ["id", "name"],
        }).then(objects => {
            return res.status(200).json({
                objects
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
        // get all users
        getObject: ( req, res ) => {

            Place.findOne( {
                where: { id: req.params.id },
                attributes : ["id", "status_public","name", "description", "createdAt", "updatedAt", "UserId", "PlaceId"],
                include: [ {model : Tag, attributes : ['id', 'name']} ]
            }).then(object => {
                return res.status(200).json({
                    object
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },




}