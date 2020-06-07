const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbDatabase: process.env.DB_DATABASE,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
};
