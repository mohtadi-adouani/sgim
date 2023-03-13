const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag
const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getTags: ( req, res ) => {

        Tag.findAll( {
            attributes : ['id', 'name'],
        }).then(tags => {
            return res.status(200).json({
                tags
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
        // get all users
        getTag: ( req, res ) => {

            Tag.findOne( {
                where: { id: req.params.id },
                attributes : {exclude : ['ObjectId', 'PlaceId']},
                include : [{model : Object, attributes : ['id']}, {model : Place, attributes : ['id']}]
            }).then(tag => {
                if(tag === null ){
                    return res.status(404).send("Tag not found")
                }
                return res.status(200).json({
                    tag
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },




}