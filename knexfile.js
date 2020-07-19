const dotenv = require('dotenv');
dotenv.config();

// const pg = require('pg');
// pg.defaults.ssl = true;


module.exports = {
    development: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/dev'
      },
      useNullAsDefault: true
    },
  
    test: {
      client: 'pg',
      connection:'postgres://localhost/<examples_test>',
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/test'
      },
      useNullAsDefault: true
    },
  
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds/production'
      },
      useNullAsDefault: true
    }
  }