import { AppDataSource } from '../dataSource.js';
import { ProjectComment } from '../entities/ProjectComment.js';

const projectCommentRepository = AppDataSource.getRepository(ProjectComment);

//create a new comment
const createProjectComment = async (
  projectId: string,
  userId: string,
  bodyText: string,
): Promise<ProjectComment> => {
  const comment = new ProjectComment();

  comment.projectId = projectId;
  comment.userId = userId;
  comment.bodyText = bodyText;

  return await projectCommentRepository.save(comment);
};

//Get all comments
const getProjectComments = async (): Promise<ProjectComment[]> => {
  return await projectCommentRepository.find();
};

//Get one comment by ID
const getProjectCommentById = async (id: string): Promise<ProjectComment | null> => {
  return await projectCommentRepository.findOne({
    where: { id },
  });
};

export { createProjectComment, getProjectCommentById, getProjectComments };
