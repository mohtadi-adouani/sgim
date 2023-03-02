const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag
const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getAllTags: ( req, res ) => {

        Tag.findAll( {
            limit: 5
        }).then(tags => {
            return res.status(200).json({
                tags
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
        // get all users
        getOneTag: ( req, res ) => {

            Tag.findOne( {
                where: { id: req.params.id },
            }).then(tag => {
                return res.status(200).json({
                    tags
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },




}