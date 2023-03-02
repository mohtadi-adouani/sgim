// Container for environments
var environments = {};

// environments
environments.development = {
    'api_port': 3000,
    'envName': 'development',
    // database env
    "username": "admin",
    "password": "admin",
    "database": "sgim_db_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
};

environments.production = {
    'api_port': 5000,
    'envName': 'production',
    // database env
    "username": "admin",
    "password": "admin",
    "database": "sgim_db_prod",
    "host": "127.0.0.1",
    "dialect": "postgres"
};

environments.test = {
    'api_port': 4000,
    'envName': 'test',
    // database env
    "username": "admin",
    "password": "admin",
    "database": "sgim_db_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
};

var currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'development';

// Export the environment
var environmentToExport = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.development;

// Export environments module
module.exports = environmentToExport;