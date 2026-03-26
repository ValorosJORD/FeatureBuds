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

export { createPost, getAllPosts, getPostById };
