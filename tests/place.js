// const request = require('supertest')
// const bcrypt = require('bcrypt')
// const app = require('../src/app').app;
//
// test('User register', async () => {
//     request(app)
//         .post('api/users/register')
//                     .send({
//                         username: 'Ahmed',
//                         email: 'Ahmed@isiam.fr',
//                         password: 'password',
//                     })
//         .expect(response => {
//             expect(response.status).toBe(200)
//             done()
//         });
// });
//
//
// // login section
// test('User login', async () => {
//     request(app)
//         .post('api/users/login')
//         .send({
//             email: 'Ahmed@isiam.fr',
//             password: await bcrypt.hash('password',10),
//         })
//         .expect(response => {
//             expect(response.status).toBe(200)
//             done()
//         });
// });
//
// test('User remove', async () => {
//     request(app)
//         .delete('api/users/1124d9e8-6266-4bcf-8035-37a02ba75c69')
//         .expect(response => {
//             expect(response.status).toBe(403)
//             done()
//         });
// });
//
// test('User get', async () => {
//     request(app)
//         .get('api/users/1124d9e8-6266-4bcf-8035-37a02ba75c69')
//         .expect(response => {
//             expect(response.status).toBe(403)
//             done()
//         });
// });
//
//
//
// test('Users get', async () => {
//     request(app)
//         .get('api/users/1124d9e8-6266-4bcf-8035-37a02ba75c69')
//         .expect(response => {
//             expect(response.status).toBe(403)
//             done()
//         });
// });