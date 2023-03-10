const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag
const Sequelize = require('sequelize');
const op = Sequelize.Op;
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

            Object.findOne( {
                where: { id: req.params.id },
                attributes : ["id", "status_public","name", "description", "createdAt", "updatedAt", "UserId", "PlaceId"],
                include: [ {model : Tag, attributes : ['id', 'name']},
                     { model : User, as : 'Writer', attributes : ['id', 'username']},
                     { model : User, as : 'Reader', attributes : ['id', 'username']}]
            }).then(object => {
                if(object === null ){
                    return res.status(404).send("Object not found")
                }
                return res.status(200).json({
                    object
                })
            }).catch(err => {
                return res.status(400).json({err})
            })
        },

    // verify if user can read (get) place
    auth_read_object: async (req, res, next) => {
        try {
            await Object.findByPk(req.params.id).then(async object => {
                if(object === null ){
                    return res.status(404).send("Object not found");
                }
                await User.findByPk(req.user.userId).then(async user => {
                    if(user === null ){
                        return res.status(401).send("User not Unauthorized login please.");
                    }
                    if( object.status_public || user.isAdmin ||await object.getOwner().id == user.id || await object.hasReader(user) || await object.hasWriter(user)){
                        next();
                    }
                    else{
                        return res.status(403).send("Forbidden :  you are nor authorized to read this object");
                    }
                })
            })
        }catch (error) {
            return res.status(500).send("Error server")
        }
    },
    // verify if user can read (put,patch, delete) place
    auth_write_object: async (req, res, next) => {
        try {
            await Object.findByPk(req.params.id).then(async object => {
                if (object === null) {
                    return res.status(404).send("Object not found");
                }
                await User.findByPk(req.user.userId).then(async user => {
                    if (user === null) {
                        return res.status(401).send("User not Unauthorized login please.");
                    }
                    if (object.status_public || user.isAdmin || await object.getOwner().id == user.id || await object.hasWriter(user)) {
                        next();
                    } else {
                        return res.status(403).send("Forbidden :  you are nor authorized to read this object");
                    }
                })
            })
        } catch (error) {
            return res.status(500).send("Error server")
        }
    },


    // recherche ---------------------------
    // recherche par nom
    getObjectByName : async (req, res) => {
        try {
            let o_name = req.query.name;

            if(! o_name ){return res.status(422).send("name is required.");}

            await User.findByPk(req.user.userId).then(async user => {

                if (user === null) {
                    return res.status(401).send("User not Unauthorized login please.");
                }

                await Object.findAll({
                    where : {
                        name : {
                            [op.like] : '%'+o_name+'%'
                        },
                    },
                    attributes : ['id']
                }).then(objects => {
                    return res.status(200).json({objects})
                });
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // recherche par tag
    getObjectByTag : async (req, res) => {
        try {
            let o_tag = req.query.tag;

            if(! o_tag ){return res.status(422).send("tag is required.");}

            await User.findByPk(req.user.userId).then(async user => {

                if (user === null) {
                    return res.status(401).send("User not Unauthorized login please.");
                }

                await Tag.findAll({
                    where : {
                        name : {
                            [op.like] : '%'+o_tag+'%'
                        },
                    },
                    attributes : ['id']
                }).then(async tags => {
                    let arrayObjects = Array();
                    for (const tag of tags) {
                        await tag.getObjects().then(objects => {
                            objects.forEach( object => {
                                if(! arrayObjects.includes(object) ){
                                    arrayObjects.push({ 'id' : object.id})
                                }
                            })
                        })
                    }
                    return res.status(200).json({'objects' :arrayObjects})
                });
            })
        } catch (error) {
            return res.status(500).send("Error server");
        }
    }





}