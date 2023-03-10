const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag

const Sequelize = require('sequelize');
const op = Sequelize.Op;
module.exports = {

    // get all users
    getPlaces: async (req, res) => {

        await Place.findAll({
            attributes: ['id', 'name', 'description'],
        }).then(places => {
            return res.status(200).json({
                places
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
    // get all users
    getPlace: async (req, res) => {

        await Place.findOne({
            where: {id: req.params.id},
            attributes: ["id", "status_public", "name", "description", "createdAt", "updatedAt", "UserId", "parentId"],
            include: [{model: Tag, attributes: ['id', 'name']},
                {model: Object, attributes: ['id', 'name']},
                {model: Place, as: 'Child', attributes: ['id', 'name']},
                {model: User, as: 'Writer', attributes: ['id', 'username']},
                {model: User, as: 'Reader', attributes: ['id', 'username']}],
        }).then(place => {
            if (place === null) {
                return res.status(404).send("Place not found")
            }
            return res.status(200).json({
                place
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    // post place
    postPlace: async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const status_public = req.body.status_public;
        let tags = req.body.tags;

        if (!name) {
            return res.status(422).send("Missing argument : name required.");
        }

        try {
            await User.findByPk(req.user.userId).then(async user => {
                await Place.create({ name : name }).then(async place => {
                    await place.setOwner(user);
                    if (description) {
                        await place.setDescription(description);
                    }
                    if (status_public) {
                        if((String(status_public) == 'true' || String(status_public) == 'false')){
                            place.status_public = status_public;
                        }
                        else{
                            await place.destroy()
                            return res.status(422).send("status public must be true or false");
                        }

                    }
                    if (tags) {
                        try{
                            tags = JSON.parse(tags)
                        } catch(error){
                            await place.destroy()
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
                                    await place.addTag(new_tag)
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
                                await place.addTag(new_tag);
                            } )
                        } else {
                            await place.destroy();
                            return res.status(422).send("tags must be Array of Strings or String");
                        }
                    }
                    await place.save();
                    return res.status(201).send({'id' : place.id});
                })
            })

        } catch (error) {
            return res.status(500).json({error});
        }
    },
    putPlace: async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const status_public = req.body.status_public;
        const userId = req.body.userId;
        const parentId = req.body.parentId;
        let readers = req.body.readers;
        let writers = req.body.writers;
        let childs = req.body.childs;
        let objects = req.body.objects;
        let tags = req.body.tags;

        try {
            await Place.findByPk(req.params.id).then(async place => {

                if (name) {
                    place.name = name;
                }
                else{
                    return res.status(422).send("name required !")
                }
                if (description) {
                    await place.setDescription(description);
                }
                else{
                    return res.status(422).send("description required !")
                }
                if (status_public) {
                    // update status or send 422 if not correct
                    if ((String(status_public) == 'true' || String(status_public) == 'false')) {
                        place.status_public = status_public;
                    } else {
                        await place.destroy()
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
                            await place.setOwner(new_user);
                        }
                    });

                }
                else{
                    return res.status(422).send("userId required !")
                }
                // modify parent
                if (parentId) {
                    if(parentId == place.id){
                        return res.status(422).send("Parent can't be self");
                    }
                    // update parentId if exist or send 404 not found
                    await Place.findByPk(parentId).then(async new_parent => {
                        if (new_parent === null) {
                            return res.status(404).send("Parent place not found");
                        } else {
                            await place.setParent(new_parent);
                        }
                    });

                }
                else{
                    return res.status(422).send("parentId required !")
                }
                // modify children
                if (childs) {
                    try {
                        childs = JSON.parse(childs)
                    } catch (error) {
                        return res.status(422).send('Childs must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (childs) == 'string'){
                        return res.status(422).send('Childs must be like ["id1"]')
                    }
                    let childs_list = Array();
                    for (const child of childs) {
                        await Place.findByPk(child).then(async new_child => {
                            if (new_child === null) {
                                return res.status(404).send("Child place not found " + child);
                            } else {
                                childs_list.push(new_child)
                            }
                            await place.setChild(childs_list);
                        });
                    }
                }
                else{
                    return res.status(422).send("childs required !")
                }
                // modify objects
                if (objects) {
                    try {
                        objects = JSON.parse(objects)
                    } catch (error) {
                        return res.status(422).send('Objects must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (objects) == 'string'){
                        return res.status(422).send('Objects must be like ["id1"]')
                    }
                    let objects_list = Array();
                    for (const object of objects) {
                        await Object.findByPk(object).then(async new_object => {
                            if (new_object === null) {
                                return res.status(404).send("Object place not found " + object);
                            } else {
                                objects_list.push(new_object)
                            }
                            await place.setObjects(objects_list);
                        });
                    }
                }
                else{
                    return res.status(422).send("objects required !")
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
                            await place.setReader(readers_list);
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
                            await place.setWriter(writers_list);
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
                        await place.destroy()
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
                                await place.addTag(new_tag)
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
                            await place.addTag(new_tag);
                        } )
                    } else {
                        await place.destroy();
                        return res.status(422).send("tags must be Array of Strings or String");
                    }
                }
                else{
                    return res.status(422).send("tags required !")
                }
                await place.save()
                return res.status(204).send("Place modified");
            })

        } catch (error) {
            return res.status(500).send("Error server");
        }
    },
    // patch place
    patchPlace: async (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const status_public = req.body.status_public;
        const userId = req.body.userId;
        const parentId = req.body.parentId;
        let readers = req.body.readers;
        let writers = req.body.writers;
        let childs = req.body.childs;
        let objects = req.body.objects;
        let tags = req.body.tags;

        try {
            await Place.findByPk(req.params.id).then(async place => {

                if (name) {
                    place.name = name;
                }
                else{
                    return res.status(422).send("Name required !")
                }
                if (description) {
                    place.setDescription(description);
                }
                if (status_public) {
                    // update status or send 422 if not correct
                    if ((String(status_public) == 'true' || String(status_public) == 'false')) {
                        place.status_public = status_public;
                    } else {
                        await place.destroy()
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
                            await place.setOwner(new_user);
                        }
                    });

                }
                // modify parent
                if (parentId) {
                    if(parentId == place.id){
                        return res.status(422).send("Parent can't be self");
                    }
                    // update parentId if exist or send 404 not found
                    await Place.findByPk(parentId).then(async new_parent => {
                        if (new_parent === null) {
                            return res.status(404).send("Parent place not found");
                        } else {
                            await place.setParent(new_parent);
                        }
                    });

                }
                // modify children
                if (childs) {
                    try {
                        childs = JSON.parse(childs)
                    } catch (error) {
                        return res.status(422).send('Childs must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (childs) == 'string'){
                        return res.status(422).send('Childs must be like ["id1"]')
                    }
                    let childs_list = Array();
                    for (const child of childs) {
                        await Place.findByPk(child).then(async new_child => {
                            if (new_child === null) {
                                return res.status(404).send("Child place not found " + child);
                            } else {
                                childs_list.push(new_child)
                            }
                            await place.setChild(childs_list);
                        });
                    }
                }
                // modify objects
                if (objects) {
                    try {
                        objects = JSON.parse(objects)
                    } catch (error) {
                        return res.status(422).send('Objects must be like ["id1", "id2",]')
                    }
                    // only one reader
                    if(typeof (objects) == 'string'){
                        return res.status(422).send('Objects must be like ["id1"]')
                    }
                    let objects_list = Array();
                    for (const object of objects) {
                        await Object.findByPk(object).then(async new_object => {
                            if (new_object === null) {
                                return res.status(404).send("Object place not found " + object);
                            } else {
                                objects_list.push(new_object)
                            }
                            await place.setObjects(objects_list);
                        });
                    }
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
                        await User.findByPk(reader).then(new_user => {
                            if(new_user === null){
                                return res.status(404).send("Reader not found "+reader);
                            }
                            else{
                                readers_list.push(new_user)
                            }
                            place.setReader(readers_list);
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
                        await User.findByPk(writer).then(new_user => {
                            if(new_user === null){
                                return res.status(404).send("Writer not found "+writer);
                            }
                            else{
                                writers_list.push(new_user)
                            }
                            place.setWriter(writers_list);
                        })
                    }

                }
                if (tags) {
                    try{
                        tags = JSON.parse(tags)
                    } catch(error){
                        place.destroy()
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
                                await place.addTag(new_tag)
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
                            await place.addTag(new_tag);
                        } )
                    } else {
                        await place.destroy();
                        return res.status(422).send("tags must be Array of Strings or String");
                    }
                }
                await place.save()
                return res.status(204).send("Place modified");
            })

        } catch (error) {
            return res.status(500).send("Error server");
        }
    },
    // remove place
    removePlace: async (req, res) => {
        try{
            await Place.findByPk(req.params.id).then(place =>{
                place.destroy()
                return res.status(204).send("deleted.")
            })
        }catch (error){
            return res.status(500).send("Error server")
        }

    },

    //------------------ CUSTOMIZED ----------------------------
    //------------------- AUTHORISATION ------------------------

    // verify if user can read (get) place
    auth_read_place: async (req, res, next) => {
        try {
            await Place.findByPk(req.params.id).then(async place => {
                if(place === null ){
                    return res.status(404).send("Place not found");
                }
                await User.findByPk(req.user.userId).then(async user => {
                        if(user === null ){
                            return res.status(401).send("User not Unauthorized login please.");
                        }
                        if( place.status_public || user.isAdmin ||await place.getOwner().id == user.id || await place.hasReader(user) || await place.hasWriter(user)){
                            next();
                        }
                        else{
                            return res.status(403).send("Forbidden :  you are nor authorized to read this place");
                        }
                })
            })
        }catch (error) {
            return res.status(500).send("Error server")
        }
    },
    // verify if user can read (put,patch, delete) place
    auth_write_place: async (req, res, next) => {
        try {
            await Place.findByPk(req.params.id).then(async place => {
                if (place === null) {
                    return res.status(404).send("Place not found");
                }
                await User.findByPk(req.user.userId).then(async user => {
                    if (user === null) {
                        return res.status(401).send("User not Unauthorized login please.");
                    }
                    if (place.status_public || user.isAdmin || await place.getOwner().id == user.id || await place.hasWriter(user)) {
                        next();
                    } else {
                        return res.status(403).send("Forbidden :  you are nor authorized to read this place");
                    }
                })
            })
        } catch (error) {
            return res.status(500).send("Error server")
        }
    },


    // recherche ---------------------------
    getPlaceByName : async (req, res) => {
        try {
            let p_name = req.query.name;

            if(! p_name ){p_name = '';}

            await User.findByPk(req.user.userId).then(async user => {

                if (user === null) {
                    return res.status(401).send("User not Unauthorized login please.");
                }

                await Place.findAll({
                    where : {
                        name : {
                            [op.like] : '%'+p_name+'%'
                        },
                    },
                    attributes : ['id']
                }).then(places => {
                    return res.status(200).json({places})
                });
            })
        } catch (error) {
            return res.status(500).json(error); //send("Error server");
        }
    },
    getPlaceByTag : async (req, res) => {
        try {
            let p_tag = req.query.tag;

            if(! p_tag ){p_tag = '';}

            await User.findByPk(req.user.userId).then(async user => {

                if (user === null) {
                    return res.status(401).send("User not Unauthorized login please.");
                }

                await Tag.findAll({
                    where : {
                        name : {
                            [op.like] : '%'+p_tag+'%'
                        },
                    },
                }).then(async tags => {
                    let arrayPlaces = Array();
                    for (const tag of tags) {
                        await tag.getPlaces().then(places => {
                            places.forEach( place => {
                                if(! arrayPlaces.includes(place) ){
                                    arrayPlaces.push(place)
                                }
                            })
                        })
                    }
                    return res.status(200).json({'places' :arrayPlaces})
                });
            })
        } catch (error) {
            return res.status(500).send("Error server");
        }
    }




}