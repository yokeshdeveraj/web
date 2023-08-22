const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createComment, getComment, updateComment, deleteComment } = require('../controllers/commentsController');

const router = express.Router();

router.post('/comments', authenticateToken, createComment);
router.get('/comments/:commentId', getComment);
router.put('/comments/:commentId', authenticateToken, updateComment);
router.delete('/comments/:commentId', authenticateToken, deleteComment);

module.exports = router;
