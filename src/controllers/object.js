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
        try {
            Object.findOne({
                where: {id: req.params.id},
                attributes: ["id", "status_public", "name", "description", "createdAt", "updatedAt", "UserId", "PlaceId"],
                include: [{model: Tag, attributes: ['id', 'name']},
                    {model: User, as: 'Writer', attributes: ['id', 'username']},
                    {model: User, as: 'Reader', attributes: ['id', 'username']}]
            }).then(object => {
                if (object === null) {
                    return res.status(404).send("Object not found")
                }
                return res.status(200).json({
                    object
                })
            })
        }catch (error){
            return res.status(500).send(error)
        }
    },

    putObject: async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const status_public = req.body.status_public;
        const userId = req.body.userId;
        const placeId = req.body.placeId;
        let readers = req.body.readers;
        let writers = req.body.writers;
        let tags = req.body.tags;

        try {
            await Object.findByPk(req.params.id).then(async object => {

                if (name) {
                    object.name = name;
                }
                else{
                    return res.status(422).send("name required !")
                }
                if (description) {
                    object.description = description;
                }
                else{
                    return res.status(422).send("description required !")
                }
                if (status_public) {
                    // update status or send 422 if not correct
                    if ((String(status_public) == 'true' || String(status_public) == 'false')) {
                        object.status_public = status_public;
                    } else {
                        await object.destroy()
                        return res.status(422).send("status public must be true or false");
                    }
                }
                else{
                    return res.status(422).send("status_public required !")
                }
                // modify owner
                if (userId) {
                    // update owner if exist or send 404 not found
                    await User.findByPk(userId).then(async new_user => {
                        if (new_user === null) {
                            return res.status(404).send("Owner not found");
                        } else {
                            await object.setOwner(new_user);
                        }
                    });

                }
                else{
                    return res.status(422).send("userId required !")
                }
                // modify parent
                if (placeId) {
                    // update parentId if exist or send 404 not found
                    await Place.findByPk(placeId).then(async new_place => {
                        if (new_place === null) {
                            return res.status(404).send("Place not found");
                        } else {
                            await object.setPlace(new_place);
                        }
                    });

                }
                else{
                    return res.status(422).send("parentId required !")
                }
                // modify readers
                if (readers) {
                    try {
                        readers = JSON.parse(readers)
                    } catch (error) {
                        return res.status(422).send('Readers must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (readers) == 'string'){
                        return res.status(422).send('Readers must be like ["id1"]')
                    }
                    let readers_list = Array();
                    for (const reader of readers) {
                        await User.findByPk(reader).then(async new_user => {
                            if (new_user === null) {
                                return res.status(404).send("Reader not found " + reader);
                            } else {
                                readers_list.push(new_user)
                            }
                            await object.setReader(readers_list);
                        })
                    }
                }
                else{
                    return res.status(422).send("readers required !")
                }
                // modify writers
                if (writers) {

                    try {
                        writers = JSON.parse(writers)
                    } catch (error) {
                        return res.status(422).send('Writers must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (writers) == 'string'){
                        return res.status(422).send('Writers must be like ["id1"]')
                    }
                    let writers_list = Array();
                    for (const writer of writers) {
                        await User.findByPk(writer).then(async new_user => {
                            if (new_user === null) {
                                return res.status(404).send("Writer not found " + writer);
                            } else {
                                writers_list.push(new_user)
                            }
                            await object.setWriter(writers_list);
                        })
                    }

                }
                else{
                    return res.status(422).send("writers required !")
                }
                if (tags) {
                    try{
                        tags = JSON.parse(tags)
                    } catch(error){
                        await object.destroy()
                        return res.status(422).send('Tags must be like ["tag1","tag2"] ');
                    }

                    if (Array.isArray(tags)) {
                        for (const tag of tags) {
                            await Tag.findOrCreate({
                                where: {
                                    name: String(tag),
                                }
                            }).then( async return_creation => {
                                let new_tag = return_creation[0]
                                let created = return_creation[1]
                                await object.addTag(new_tag)
                            })
                        }
                    } else if (typeof (tags) == 'string') {
                        await Tag.findOrCreate({
                            where: {
                                name: tags
                            }
                        }).then( async return_creation => {
                            let new_tag = return_creation[0]
                            let created = return_creation[1]
                            await object.addTag(new_tag);
                        } )
                    } else {
                        await object.destroy();
                        return res.status(422).send("tags must be Array of Strings or String");
                    }
                }
                else{
                    return res.status(422).send("tags required !")
                }
                await object.save()
                return res.status(204).send("Object modified");
            })

        } catch (error) {
            return res.status(500).send("Error server");
        }
    },


    patchObject: async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const status_public = req.body.status_public;
        const userId = req.body.userId;
        const placeId = req.body.placeId;
        let readers = req.body.readers;
        let writers = req.body.writers;
        let tags = req.body.tags;

        try {
            await Object.findByPk(req.params.id).then(async object => {

                if (name) {
                    object.name = name;
                }

                if (description) {
                    object.description = description;
                }

                if (status_public) {
                    // update status or send 422 if not correct
                    if ((String(status_public) == 'true' || String(status_public) == 'false')) {
                        object.status_public = status_public;
                    } else {
                        await object.destroy()
                        return res.status(422).send("status public must be true or false");
                    }
                }

                // modify owner
                if (userId) {
                    // update owner if exist or send 404 not found
                    await User.findByPk(userId).then(async new_user => {
                        if (new_user === null) {
                            return res.status(404).send("Owner not found");
                        } else {
                            await object.setOwner(new_user);
                        }
                    });

                }

                // modify parent
                if (placeId) {
                    // update parentId if exist or send 404 not found
                    await Place.findByPk(placeId).then(async new_place => {
                        if (new_place === null) {
                            return res.status(404).send("Place not found");
                        } else {
                            await object.setPlace(new_place);
                        }
                    });

                }

                // modify readers
                if (readers) {
                    try {
                        readers = JSON.parse(readers)
                    } catch (error) {
                        return res.status(422).send('Readers must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (readers) == 'string'){
                        return res.status(422).send('Readers must be like ["id1"]')
                    }
                    let readers_list = Array();
                    for (const reader of readers) {
                        await User.findByPk(reader).then(async new_user => {
                            if (new_user === null) {
                                return res.status(404).send("Reader not found " + reader);
                            } else {
                                readers_list.push(new_user)
                            }
                            await object.setReader(readers_list);
                        })
                    }
                }

                // modify writers
                if (writers) {

                    try {
                        writers = JSON.parse(writers)
                    } catch (error) {
                        return res.status(422).send('Writers must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (writers) == 'string'){
                        return res.status(422).send('Writers must be like ["id1"]')
                    }
                    let writers_list = Array();
                    for (const writer of writers) {
                        await User.findByPk(writer).then(async new_user => {
                            if (new_user === null) {
                                return res.status(404).send("Writer not found " + writer);
                            } else {
                                writers_list.push(new_user)
                            }
                            await object.setWriter(writers_list);
                        })
                    }

                }

                if (tags) {
                    try{
                        tags = JSON.parse(tags)
                    } catch(error){
                        await object.destroy()
                        return res.status(422).send('Tags must be like ["tag1","tag2"] ');
                    }

                    if (Array.isArray(tags)) {
                        for (const tag of tags) {
                            await Tag.findOrCreate({
                                where: {
                                    name: String(tag),
                                }
                            }).then( async return_creation => {
                                let new_tag = return_creation[0]
                                let created = return_creation[1]
                                await object.addTag(new_tag)
                            })
                        }
                    } else if (typeof (tags) == 'string') {
                        await Tag.findOrCreate({
                            where: {
                                name: tags
                            }
                        }).then( async return_creation => {
                            let new_tag = return_creation[0]
                            let created = return_creation[1]
                            await object.addTag(new_tag);
                        } )
                    } else {
                        await object.destroy();
                        return res.status(422).send("tags must be Array of Strings or String");
                    }
                }

                await object.save()
                return res.status(204).send("Object modified");
            })

        } catch (error) {
            return res.status(500).send("Error server");
        }
    },

    // post object
    postObject: async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const status_public = req.body.status_public;
        const placeId = req.body.placeId;
        let tags = req.body.tags;

        if (!name) {
            return res.status(422).send("Missing argument : name required.");
        }

        await User.findByPk(req.user.userId).then(async user => {
            await Object.create({ name : name }).then(async object => {
                await object.setOwner(user);
                if (description) {
                    object.description = description;
                }
                if (status_public) {
                    if((String(status_public) == 'true' || String(status_public) == 'false')){
                        object.status_public = status_public;
                    }
                    else{
                        await object.destroy()
                        return res.status(422).send("status public must be true or false");
                    }

                }
                if (tags) {
                    try{
                        tags = JSON.parse(tags)
                    } catch(error){
                        await object.destroy()
                        return res.status(422).send('Tags must be like ["tag1","tag2"] ');
                    }

                    if (Array.isArray(tags)) {
                        for (const tag of tags) {
                            await Tag.findOrCreate({
                                where: {
                                    name: String(tag),
                                }
                            }).then( async return_creation => {
                                let new_tag = return_creation[0]
                                let created = return_creation[1]
                                await object.addTag(new_tag)
                            })
                        }
                    } else if (typeof (tags) == 'string') {
                        await Tag.findOrCreate({
                            where: {
                                name: tags
                            }
                        }).then( async return_creation => {
                            let new_tag = return_creation[0]
                            let created = return_creation[1]
                            await object.addTag(new_tag);
                        } )
                    } else {
                        await object.destroy();
                        return res.status(422).send("tags must be Array of Strings or String");
                    }
                }


                // modify parent
                if (placeId) {
                    // update parentId if exist or send 404 not found
                    await Place.findByPk(placeId).then(async new_place => {
                        if (new_place === null) {
                            await object.destroy();
                            return res.status(404).json({"message" : "Place not found"});
                        } else {
                            await object.setPlace(new_place);
                        }
                    });

                }

                await object.save();
                return res.status(201).json({'id' : object.id});
            });
        });
    },
    // remove place
    removeObject: async (req, res) => {
        try{
            await Object.findByPk(req.params.id).then(object =>{
                object.destroy()
                return res.status(204).send("deleted.")
            })
        }catch (error){
            return res.status(500).send("Error server")
        }

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
                    if( object.status_public || user.isAdmin || (await object.getOwner()).id == user.id || await object.hasReader(user) || await object.hasWriter(user)){
                        next();
                    }
                    else{
                        return res.status(403).send("Forbidden :  you are nor authorized to read this object");
                    }
                }).catch(error => {
                    return res.status(501).json(error);
                });
            });
        }catch(error) {
            return res.status(500).send("Error servers")
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
                    if (user.isAdmin || (await object.getOwner()).id == user.id || await object.hasWriter(user)) {
                        next();
                    } else {
                        return res.status(403).send("Forbidden :  you are nor authorized to write this object");
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