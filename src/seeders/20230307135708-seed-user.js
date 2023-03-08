'use strict';
const User = require('../models').User
const Place = require('../models').Place
const Object = require('../models').Object
const Tag = require('../models').Tag
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
          const mohtadi_user = await User.create({
            username: 'Mohtadi',
            email: 'Mohtadi@isima.fr',
            password: await bcrypt.hash("Mohtadi", 10),
          });
          const amine_user = await User.create({
            username: 'Amine',
            email: 'Amine@isima.fr',
              password: await bcrypt.hash("Amine", 10),
          });
          const asma_user = await User.create({
            username: 'Asma',
            email: 'Asma@isima.fr',
              password: await bcrypt.hash("Mohtadi", 10),
          });
          const ahmad_user = await User.create({
            username: 'Ahmed',
            email: 'Ahmed@isima.fr',
            password: 'Ahmed',
          });
          const hamadou_user = await User.create({
            username: 'Hamadou',
            email: 'Hamadou@isima.fr',
            password: 'Hamadou',
          });
          let users = [mohtadi_user, amine_user, asma_user, ahmad_user, hamadou_user];

          // name
          let maison = await Place.create({
            name: 'Maison'
          });
          let publics = Array(maison);

          let names_publics = ["Salle de bain", "Cuisine", "Salon"]
          let desc_publics = ["Salle de bain 1 er étage", "Cuisine rez de chaussée", "Salon rez de chaussée"]
          for(let i = 0; i< names_publics.length;i++){
            let lieu = await Place.create({
              name: names_publics[i],
              description: desc_publics[i],
                status_public : true
            });
            lieu.setParent(maison);
            lieu.setReader(mohtadi_user);
            lieu.setReader(amine_user);
            lieu.setWriter(mohtadi_user);
            lieu.setWriter(amine_user);
          }

            // users room
            let roomes = Array()
            let i = 0
            for (const user of users) {
                let room = await Place.create({
                  name: 'Chambre de ' + user.username,
                  description: 'Chambre de ' + user.username + ' , étage  : ' + i % 2,
                });
                i++
                // set room in the house
                room.setParent(maison);
                room.setOwner(user);
                roomes.push(room)
          }

            let room_tag = await Tag.create({ name : "Room" });
            let tech_tag = await Tag.create({ name : "Tech" });
            for (let room of roomes) {
                let owner = await room.getOwner();
                await room.addTag(room_tag);
                let placard = await Place.create({ name : "Placard de "+owner.username})
                await placard.setOwner(owner);
                await placard.setParent(room);
                let mobile = await Object.create({ name : "Mobile de "+owner.username})
                await mobile.setOwner(owner);
                await mobile.setPlace(placard);
                await mobile.addTag(tech_tag);
          }
  },

  async down (queryInterface, Sequelize) {
    await User.destroy({
      where: {},
      });
    await Place.destroy({
    where: {},
    });
    await Tag.destroy({
    where: {},
    });
    await Object.destroy({
    where: {},
    });
      }
};


