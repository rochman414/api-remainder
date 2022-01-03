require('dotenv').config();
  module.exports = {
    "development": {
      "username": process.env.DB_DEV_USERNAME,
      "password": process.env.DB_DEV_PASSWORD,
      "database": process.env.DB_DEV_DATABASE,
      "host": process.env.DB_DEV_HOST,
      "dialect": "postgres"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
