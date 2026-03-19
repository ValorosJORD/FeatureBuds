import { Request, Response } from 'express';
import { createPost, getPostById, getPosts } from '../models/PostModel.js';
import { createPostSchema } from '../validators/PostValidators.js';

//　Create post
const createPostController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = createPostSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.issues });
      return;
    }
    const { userId, title, bodyText, topic } = result.data;
    const post = await createPost(userId, title, bodyText, topic);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
const getPostsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

// Get one post by id
const getPostByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get post' });
  }
};

export { createPostController, getPostByIdController, getPostsController };
