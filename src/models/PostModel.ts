// src/models/postModel.ts
//read/write the database
import { AppDataSource } from '../dataSource.js';
import { Post } from '../entities/Post.js';

const postRepository = AppDataSource.getRepository(Post);

// Create -> make post and save...
async function createPost(
  userId: string,
  title: string,
  topic: string,
  bodyText: string,
): Promise<Post> {
  const newPost = new Post();
  newPost.userId = userId;
  newPost.title = title;
  newPost.topic = topic;
  newPost.bodyText = bodyText;

  return postRepository.save(newPost);
}

//Get all posts
async function getAllPosts(): Promise<Post[]> {
  return postRepository.find();
}

//Get one post by Id
async function getPostById(postId: string): Promise<Post | null> {
  return postRepository.findOne({ where: { postId } });
}

//update Post
async function updatePost(postId: string, newPost: string): Promise<Post | null> {
  const post = await postRepository.findOne({ where: { postId } });

  if (!post) {
    return null;
  }

  post.bodyText = newPost;

  return postRepository.save(post);
}

//delete Post
async function deletePostById(postId: string): Promise<void> {
  const post = await postRepository.findOne({ where: { postId } });

  if (!post) {
    return;
  }

  await postRepository.remove(post);
}

export { createPost, deletePostById, getAllPosts, getPostById, updatePost };
