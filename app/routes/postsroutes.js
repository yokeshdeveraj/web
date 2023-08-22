const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createPost, getPost, updatePost, deletePost } = require('../controllers/postsController');

const router = express.Router();

router.post('/posts', authenticateToken, createPost);
router.get('/posts/:postId', getPost);
router.put('/posts/:postId', authenticateToken, updatePost);
router.delete('/posts/:postId', authenticateToken, deletePost);

module.exports = router;
