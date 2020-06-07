/* eslint-disable require-jsdoc */
const util = require('util');

const mysql = require('mysql');

const env = require('./env');

const connection = mysql.createConnection({
  host: '0.0.0.0',
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbDatabase,
});

// We must use a promise wrapper for the callback-based mysql library
const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting to DB: ${err}`);
  }
});

async function getReviews() {
  try {
    const res = await query('SELECT title, description FROM `reviews`');
    return res.map(({title, description}) => {
      return {
        title: title.toString('utf8'),
        description: description.toString('utf8'),
      };
    });
  } catch (err) {
    console.error(err);
  }
}

async function addReview(review) {
  try {
    // SET is part of MySQL insert syntax.
    const res = await query(
        'INSERT INTO reviews SET ?',
        review,
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}

exports.getReviews = getReviews;
exports.addReview = addReview;
