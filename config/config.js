
module.exports = {
    development: {
        'api_port': 3000,
        'JWT_SIGN_SECRET' : 'cnzkejlze456r4zzre5r4ze4rze4rz6e4r',
        username: "admin",
        password: "admin",
        database: "sgim_db_dev",
        host: "sgim_db",
        dialect: "postgres",
        logging: false
    },
    test: {
        'api_port': 5000,
        'JWT_SIGN_SECRET' : 'cnzkejlze456r4zzre5r4ze4rze4rz6e4r',

        username: "admin",
        password: "admin",
        database: "sgim_db_test",
        host: "sgim_db",
        dialect: "postgres",
        logging: false
    },
    production: {
        'api_port': 4000,
        'JWT_SIGN_SECRET' : 'cnzkejlze456r4zzre5r4ze4rze4rz6e4r',

        username: "admin",
        password: "admin",
        database: "sgim_db_prod",
        host: "sgim_db",
        dialect: "postgres",
        logging: false
    }

};