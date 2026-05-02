import { Request, Response } from 'express';
import {
  createProjectComment,
  deleteCommentById,
  getProjectCommentById,
  getProjectComments,
  updateComment,
} from '../models/ProjectCommentModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import {
  createProjectCommentSchema,
  UpdateProjectCommentsSchema,
} from '../validators/ProjectCommentValidators.js';

async function createProjectCommentController(req: Request, res: Response): Promise<void> {
  const result = createProjectCommentSchema.safeParse(req.body);
  // 400 - Bad request (check input)

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const projectId = req.params.projectId;
  const { userId, bodyText } = result.data;

  try {
    const newProjectComment = await createProjectComment(projectId, userId, bodyText);
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
    const result = await getProjectComments(req.params.projectId);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

//update
async function patchCommentController(req: Request, res: Response): Promise<void> {
  const { commentId } = req.params;

  const result = UpdateProjectCommentsSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  try {
    const updatedComment = await updateComment(commentId, result.data.bodyText);
    if (!updatedComment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    res.json({ post: updatedComment });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

//delete
async function deleteProjectCommentController(req: Request, res: Response): Promise<void> {
  const { commentId } = req.params;
  const comment = await getProjectCommentById(commentId);

  if (!comment) {
    res.status(404).json({ error: 'Comment not found' });
    return;
  }

  await deleteCommentById(commentId);
  res.sendStatus(204); // 204 No Content — successful, nothing to return
}

export {
  createProjectCommentController,
  deleteProjectCommentController,
  getProjectCommentByIdController,
  getProjectCommentsController,
  patchCommentController,
};
