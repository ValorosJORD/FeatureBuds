import { Request, Response } from 'express';
import {
  createProjectComment,
  getProjectCommentById,
  getProjectComments,
} from '../models/ProjectCommentModel.js';
import { createProjectCommentSchema } from '../validators/ProjectCommentValidators.js';

async function createProjectCommentController(req: Request, res: Response): Promise<void> {
  const result = createProjectCommentSchema.safeParse(req.body);
  // 400 - Bad request (check input)

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { userId, bodyText } = result.data;

  try {
    const newProjectComment = await createProjectComment(userId, bodyText);
    res.status(201).json(newProjectComment); //succcess and return the data
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // 500 Internal Server Error
  }
}

async function getProjectCommentByIdController(req: Request, res: Response): Promise<void> {
  try {
    const result = await getProjectCommentById(req.params.commentId);
    if (!result) {
      res.status(404).json({ errors: 'Not Found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getProjectCommentsController(req: Request, res: Response): Promise<void> {
  try {
    const result = await getProjectComments();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export {
  createProjectCommentController,
  getProjectCommentByIdController,
  getProjectCommentsController,
};
