require('dotenv').config();

module.exports = {

    "development" : {
        'api_port': 3000,
        'envName': 'development',
        // database env
        "username": "admin",
        "password": "admin",
        "database": "sgim_db_dev",
        "host": "sgim_db",
        "dialect": "postgres",

        // jws secret key to sign tokens
        'JWT_SIGN_SECRET' : 'cnzkejlze456r4zzre5r4ze4rze4rz6e4r'
    },

    "production" : {
        'api_port': 4000,
        'envName': 'production',

        // database env
        "username": "admin",
        "password": "admin",
        "database": "sgim_db_prod",
        "host": "sgim_db",
        "dialect": "postgres",

        // jws secret key to sign tokens
        'JWT_SIGN_SECRET' : 'cnzkejlze456r4zzre5r4ze4rze4rz6e4r'
    },

    "test" : {
        'api_port': 5000,
        'envName': 'test',

        // database env
        "username": "admin",
        "password": "admin",
        "database": "sgim_db_test",
        "host": "sgim_db",
        "dialect": "postgres",

        // jws secret key to sign tokens
        'JWT_SIGN_SECRET' : 'cnzkejlze456r4zzre5r4ze4rze4rz6e4r'
    }
}