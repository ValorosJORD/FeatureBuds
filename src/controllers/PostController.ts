import { Request, Response } from 'express';
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePost,
} from '../models/PostModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreatePostSchema, UpdatePostSchema } from '../validators/PostValidators.js';
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

//update
async function patchPostController(req: Request, res: Response): Promise<void> {
  const { postId } = req.params;

  const result = UpdatePostSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  try {
    const { title, topic, bodyText } = result.data;
    //3 entities might be changed
    const updatedPost = await updatePost(postId, bodyText, title, topic);
    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ post: updatedPost });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

//delete
async function deletePostController(req: Request, res: Response): Promise<void> {
  const { postId } = req.params;
  const post = await getPostById(postId);

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  await deletePostById(postId);
  res.sendStatus(204); // 204 No Content — successful, nothing to return
}

export {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  patchPostController,
};
