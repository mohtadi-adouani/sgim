var request = require('supertest')
var app = require('../src/app').app;
var res = request(app);
var token;
let Place = require('../src/models').Place;
let Object = require('../src/models').Object;
let User = require('../src/models').User;
var user_id;


test('TEST USERS CONNECTION', async ()=> {
    res.post('api/users/login')
        .send({
            email: 'Mohtadi@isiam.fr',
            password: 'Mohtadi',
        }).expect( response =>{
        token = response.body.token;
        done();
    });
})

describe('Users TESTS' , () => {

    test('POST user ', async () => {
        res.post('api/users/register')
            .send({
                username: 'username test 1',
                email: 'm@isiam.fr',
                password: 'testttttt',
            })
            .expect(response => {
                user_id = res.body.id;
                expect(response.status).toBe(201)
                done()
            });
    });


    test('GET all users ', async () => {
        res.get('api/users/')
            .query({
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });

    test('GET one user ', async () => {
        res.get('api/users/' + user_id)
            .query({
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });

    test('PUT user ', async () => {

        res.put('api/users/' + user_id)
            .send({
                token: token,
                username :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(422) // all params required
                done()
            });
    });

    test('PATCH user ', async () => {
        res.put('api/user/' + user_id)
            .send({
                token: token,
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(200)
                done()
            });
    });


    test('DELETE user ', async () => {

        res.delete('api/objects/' + user_id)
            .send({
                token: token,
            })
            .expect(response => {
                expect(response.status).toBe(200)
                done()
            });
    });

});


describe('Users without auth TESTS' , () => {

    test('POST user ', async () => {
        res.post('api/users/')
            .send({
                username: 'test 1',
            })
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });


    test('GET all users ', async () => {
        res.get('api/users/')
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

    test('GET one user ', async () => {
        res.get('api/users/' + user_id)
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

    test('PUT user ', async () => {
        res.put('api/users/' + user_id)
            .send({
                username :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(403) // all params required
                done()
            });
    });

    test('PATCH user ', async () => {
        res.put('api/users/' + user_id)
            .send({
                username :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });


    test('DELETE user ', async () => {
        res.delete('api/users/' + user_id)
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

});
test('TEST PLACES CONNECTION', async ()=> {
    res.post('api/users/login')
        .send({
            email: 'Mohtadi@isiam.fr',
            password: 'Mohtadi',
        }).expect( response =>{
        token = response.body.token;
        done();
    });
})

describe('Places TESTS' , () => {

    test('POST place ', async () => {
        res.post('api/places/')
            .send({
                name: 'Place test 1',
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });


    test('GET all places ', async () => {
        res.get('api/places/')
            .query({
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });

    test('GET one place ', async () => {
        let place_to_get = await Place.create({
            name: 'places test 2'
        });
        res.get('api/places/' + place_to_get.id)
            .query({
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });

    test('PUT place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.put('api/places/' + place_to_get.id)
            .send({
                token: token,
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(422) // all params required
                done()
            });
    });

    test('PATCH Place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.put('api/places/' + place_to_get.id)
            .send({
                token: token,
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(200)
                done()
            });
    });


    test('DELETE place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.delete('api/places/' + place_to_get.id)
            .send({
                token: token,
            })
            .expect(response => {
                expect(response.status).toBe(200)
                done()
            });
    });

});


describe('Places without auth TESTS' , () => {

    test('POST place ', async () => {
        res.post('api/places/')
            .send({
                name: 'place test 1',
            })
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });


    test('GET all places ', async () => {
        res.get('api/places/')
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

    test('GET one place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.get('api/places/' + place_to_get.id)
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

    test('PUT place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.put('api/place/' + place_to_get.id)
            .send({
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(403) // all params required
                done()
            });
    });

    test('PATCH place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.put('api/place/' + place_to_get.id)
            .send({
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });


    test('DELETE place ', async () => {
        let place_to_get = await Place.create({
            name: 'place test 2'
        });
        res.delete('api/places/' + place_to_get.id)
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

});



test('TEST OBJECT CONNECTION', async ()=> {
    res.post('api/users/login')
        .send({
            email: 'Mohtadi@isiam.fr',
            password: 'Mohtadi',
        }).expect( response =>{
        token = response.body.token;
        done();
    });
})

describe('Objects TESTS' , () => {

    test('POST object ', async () => {
        res.post('api/objects/')
            .send({
                name: 'Object test 1',
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });


    test('GET all objects ', async () => {
        res.get('api/objects/')
            .query({
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });

    test('GET one object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.get('api/objects/' + object_to_get.id)
            .query({
                token: token
            })
            .expect(response => {
                expect(response.status).toBe(201)
                done()
            });
    });

    test('PUT object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.put('api/objects/' + object_to_get.id)
            .send({
                token: token,
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(422) // all params required
                done()
            });
    });

    test('PATCH object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.put('api/objects/' + object_to_get.id)
            .send({
                token: token,
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(200)
                done()
            });
    });


    test('DELETE object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.delete('api/objects/' + object_to_get.id)
            .send({
                token: token,
            })
            .expect(response => {
                expect(response.status).toBe(200)
                done()
            });
    });

});


describe('Objects without auth TESTS' , () => {

    test('POST object ', async () => {
        res.post('api/objects/')
            .send({
                name: 'Object test 1',
            })
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });


    test('GET all objects ', async () => {
        res.get('api/objects/')
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

    test('GET one object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.get('api/objects/' + object_to_get.id)
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

    test('PUT object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.put('api/objects/' + object_to_get.id)
            .send({
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(403) // all params required
                done()
            });
    });

    test('PATCH object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.put('api/objects/' + object_to_get.id)
            .send({
                name :'New name'
            })
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });


    test('DELETE object ', async () => {
        let object_to_get = await Object.create({
            name: 'object test 2'
        });
        res.delete('api/objects/' + object_to_get.id)
            .expect(response => {
                expect(response.status).toBe(403)
                done()
            });
    });

});