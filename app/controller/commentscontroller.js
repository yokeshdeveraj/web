const { createComment, findCommentById, updateComment, deleteComment } = require('../models/comment');
const { findPostById } = require('../models/post');

async function createComment(req, res) {
  try {
    const { postId, commentContent } = req.body;
    const { userId } = req;

    const post = await findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    const newComment = await createComment(userId, postId, commentContent);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getComment(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;
    const { commentContent } = req.body;

    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }
    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this comment.' });
    }

    const updatedComment = await updateComment(commentId, userId, commentContent);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }
    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment.' });
    }

    await deleteComment(commentId, userId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
