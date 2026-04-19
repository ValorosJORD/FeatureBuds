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

//Get all Comments
async function getProjectComments(): Promise<ProjectComment[]> {
  return await projectCommentRepository.find();
}

//Get one comment by Id
async function getProjectCommentById(commentId: string): Promise<ProjectComment | null> {
  return projectCommentRepository.findOne({ where: { commentId } });
}

//update Comment
async function updateComment(
  commentId: string,
  newComment: string,
): Promise<ProjectComment | null> {
  const comment = await projectCommentRepository.findOne({ where: { commentId } });

  if (!comment) {
    return null;
  }

  comment.bodyText = newComment;

  return projectCommentRepository.save(comment);
}

//delete Comment
async function deleteCommentById(commentId: string): Promise<void> {
  const comment = await projectCommentRepository.findOne({ where: { commentId } });

  if (!comment) {
    return;
  }

  await projectCommentRepository.remove(comment);
}

export {
  createProjectComment,
  deleteCommentById,
  getProjectCommentById,
  getProjectComments,
  updateComment,
};
