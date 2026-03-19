import { AppDataSource } from '../dataSource.js';
import { Post } from '../entities/Post.js';

const postRepository = AppDataSource.getRepository(Post);

// create a new post
const createPost = async (
  userId: string,
  title: string,
  bodyText: string,
  topic: string,
): Promise<Post> => {
  const post = new Post();

  post.userId = userId;
  post.title = title;
  post.bodyText = bodyText;
  post.topic = topic;

  return await postRepository.save(post);
};

// get all posts
const getPosts = async (): Promise<Post[]> => {
  return await postRepository.find();
};

// get post by id
const getPostById = async (id: string): Promise<Post | null> => {
  return await postRepository.findOne({
    where: { id },
  });
};

export { createPost, getPostById, getPosts };
