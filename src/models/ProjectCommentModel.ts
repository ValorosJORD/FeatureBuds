// src/models/ProjectCommentModel.ts
//read/write the database
import { AppDataSource } from '../dataSource.js';
import { ProjectComment } from '../entities/ProjectComment.js';

const projectCommentRepository = AppDataSource.getRepository(ProjectComment);

// Create -> make projectComment and save...
async function createProjectComment(
  // commentId: string,
  userId: string,
  // auto-generated (@BeforeInsert()) commentId: string,
  bodyText: string,
): Promise<ProjectComment> {
  const newProjectComment = new ProjectComment();
  // newProjectComment.commentId = commentId;
  newProjectComment.userId = userId;
  newProjectComment.bodyText = bodyText;

  return await projectCommentRepository.save(newProjectComment);
}

//Get all posts
async function getProjectComments(): Promise<ProjectComment[]> {
  return await projectCommentRepository.find();
}

//Get one post by Id
async function getProjectCommentById(commentId: string): Promise<ProjectComment | null> {
  return projectCommentRepository.findOne({ where: { commentId } });
}

export { createProjectComment, getProjectCommentById, getProjectComments };
