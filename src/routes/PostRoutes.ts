import express from 'express';
import {
  createPostController,
  getPostByIdController,
  getPostsController,
} from '../controllers/PostController.js';

const router = express.Router();

// create a new post
router.post('/posts', createPostController);

// get posts
router.post('/posts', getPostsController);

// get one post by id
router.get('/posts/:id', getPostByIdController);

export default router;
