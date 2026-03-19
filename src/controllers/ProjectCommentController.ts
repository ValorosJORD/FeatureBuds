import { Request, Response } from 'express';
import {
  createProjectComment,
  getProjectCommentById,
  getProjectComments,
} from '../models/ProjectCommentModel.js';
import { createProjectCommentSchema } from '../validators/ProjectCommentValidators.js';

// Create comment
const createProjectCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = createProjectCommentSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.issues });
      return;
    }
    const { projectId, userId, bodyText } = result.data;

    const comment = await createProjectComment(projectId, userId, bodyText);

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Get all comments
const getProjectCommentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await getProjectComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
};
// Get comment by id
const getProjectCommentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const comment = await getProjectCommentById(id);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comment' });
  }
};

export {
  createProjectCommentController,
  getProjectCommentByIdController,
  getProjectCommentsController,
};
