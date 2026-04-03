import { Request, Response } from 'express';
import { createPost, getAllPosts, getPostById } from '../models/PostModel.js';
import { CreatePostSchema } from '../validators/PostValidators.js';

async function createPostController(req: Request, res: Response): Promise<void> {
  const result = CreatePostSchema.safeParse(req.body);

  //An async function always returns a Promise.

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { userId, title, topic, bodyText } = result.data;
  const newPost = await createPost(userId, title, topic, bodyText);
  console.log(newPost);
  res.status(201).json(newPost);
}

async function getPostsController(req: Request, res: Response): Promise<void> {
  const result = await getAllPosts();
  if (!result) {
    res.status(404).json({ errors: 'Not Found' });
    return;
  }
  res.status(200).json({ result });
}

async function getPostByIdController(req: Request, res: Response): Promise<void> {
  const result = await getPostById(req.params.postId);
  if (!result) {
    res.status(404).json({ errors: 'Not Found' });
    return;
  }
  res.status(200).json({ result });
}

export { createPostController, getPostByIdController, getPostsController };
