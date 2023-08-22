const pool = require('../config/dbConfig');

async function createUser(emailAddress, password) {
  const query = 'INSERT INTO users(emailAddress, password) VALUES($1, $2) RETURNING *';
  const values = [emailAddress, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findUserByEmail(emailAddress) {
  const query = 'SELECT * FROM users WHERE emailAddress = $1';
  const values = [emailAddress];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
