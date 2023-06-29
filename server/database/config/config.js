if (!process.env.NODE_ENV) { // when running migrations or seeders
  require('dotenv').config({ path: '../.env' });
}

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development'
};

module.exports = {
  [process.env.NODE_ENV]: config
};
