const pool = require('../config/dbConfig');

async function createComment(userId, postId, commentContent) {
  const query = 'INSERT INTO comments(userId, postId, commentContent) VALUES($1, $2, $3) RETURNING *';
  const values = [userId, postId, commentContent];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function findCommentById(commentId) {
  const query = 'SELECT * FROM comments WHERE commentId = $1';
  const values = [commentId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function updateComment(commentId, userId, commentContent) {
  const query = 'UPDATE comments SET commentContent = $1 WHERE commentId = $2 AND userId = $3 RETURNING *';
  const values = [commentContent, commentId, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function deleteComment(commentId, userId) {
  const query = 'DELETE FROM comments WHERE commentId = $1 AND userId = $2';
  const values = [commentId, userId];
  await pool.query(query, values);
}

module.exports = {
  createComment,
  findCommentById,
  updateComment,
  deleteComment,
};
