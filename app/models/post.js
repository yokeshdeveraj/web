const pool = require('../config/dbConfig');

async function createPost(userId, postTitle, postContent) {
  const query = 'INSERT INTO posts(userId, postTitle, postContent) VALUES($1, $2, $3) RETURNING *';
  const values = [userId, postTitle, postContent];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findPostById(postId) {
  const query = 'SELECT * FROM posts WHERE postId = $1';
  const values = [postId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function updatePost(postId, userId, postTitle, postContent) {
  const query = 'UPDATE posts SET postTitle = $1, postContent = $2 WHERE postId = $3 AND userId = $4 RETURNING *';
  const values = [postTitle, postContent, postId, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function deletePost(postId, userId) {
  const query = 'DELETE FROM posts WHERE postId = $1 AND userId = $2';
  const values = [postId, userId];
  await pool.query(query, values);
}

module.exports = {
  createPost,
  findPostById,
  updatePost,
  deletePost,
};
