const { createPost, findPostById, updatePost, deletePost } = require('../models/post');

async function createPost(req, res) {
  try {
    const { postTitle, postContent } = req.body;
    const { userId } = req;

    const newPost = await createPost(userId, postTitle, postContent);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPost(req, res) {
  try {
    const { postId } = req.params;
    const post = await findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const { postTitle, postContent } = req.body;

    const post = await findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this post.' });
    }

    const updatedPost = await updatePost(postId, userId, postTitle, postContent);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await findPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post.' });
    }

    await deletePost(postId, userId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
