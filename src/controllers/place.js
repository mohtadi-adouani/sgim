const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag

const { Sequelize } = require('sequelize');
module.exports = {

    // get all users
    getPlaces: ( req, res ) => {

        Place.findAll( {
            attributes : ['id','name','description'],
        }).then(places => {
            return res.status(200).json({
                places
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },
    // get all users
    getPlace: ( req, res ) => {

        Place.findOne( {
            where: { id: req.params.id },
            attributes : ["id", "status_public","name", "description", "createdAt", "updatedAt", "UserId", "parentId"],
            include: [{model : Tag, attributes : ['id', 'name']},
                {model : Object, attributes : ['id', 'name']},
                { model : Place, as : 'Child', attributes : ['id', 'name']},
                { model : User, as : 'Writer', attributes : ['id', 'username']},
                { model : User, as : 'Reader', attributes : ['id', 'username']}],
        }).then(place => {
            if(place === null ){
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
                    place.setOwner(user);
                    if (description) {
                        place.setDescription(description);
                    }
                    if (status_public) {
                        if((String(status_public) == 'true' || String(status_public) == 'false')){
                            place.status_public = status_public;
                        }
                        else{
                            place.destroy()
                            return res.status(422).send("status public must be true or false");
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
                                }).then( return_creation => {
                                    let new_tag = return_creation[0]
                                    let created = return_creation[1]
                                    place.addTag(new_tag)
                                })
                            }
                        } else if (typeof (tags) == 'string') {
                            await Tag.findOrCreate({
                                where: {
                                    name: tags
                                }
                            }).then( return_creation => {
                                let new_tag = return_creation[0]
                                let created = return_creation[1]
                                place.addTag(new_tag);
                            } )
                        } else {
                            place.destroy();
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
    }




}