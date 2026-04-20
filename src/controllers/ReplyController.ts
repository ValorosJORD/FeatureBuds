import { Request, Response } from 'express';
import {
  createReply,
  deleteReplyById,
  getAllReplies,
  getReplyById,
  updateReply,
} from '../models/ReplyModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateReplySchema, UpdateReplySchema } from '../validators/ReplyValidators.js';

async function createReplyController(req: Request, res: Response): Promise<void> {
  const result = CreateReplySchema.safeParse(req.body);
  // 400 - Bad request (check input)
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { userId, commentId, bodyText } = result.data;

  try {
    const newReply = await createReply(userId, commentId, bodyText);
    res.status(201).json(newReply); //succcess and return the data
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // 500 Internal Server Error
  }
}

async function getReplyByIdController(req: Request, res: Response): Promise<void> {
  try {
    const result = await getReplyById(req.params.replyId);
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

async function getReplyController(req: Request, res: Response): Promise<void> {
  try {
    const result = await getAllReplies();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

//update
async function patchReplyController(req: Request, res: Response): Promise<void> {
  const { replyId } = req.params;

  const result = UpdateReplySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  try {
    const updatedReply = await updateReply(replyId, result.data.bodyText);
    if (!updatedReply) {
      res.status(404).json({ error: 'Reply not found' });
      return;
    }
    res.json({ post: updatedReply });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

//delete
async function deleteReplyController(req: Request, res: Response): Promise<void> {
  const { replyId } = req.params;
  const reply = await getReplyById(replyId);

  if (!reply) {
    res.status(404).json({ error: 'Reply not found' });
    return;
  }

  await deleteReplyById(replyId);
  res.sendStatus(204); // 204 No Content — successful, nothing to return
}

export {
  createReplyController,
  deleteReplyController,
  getReplyByIdController,
  getReplyController,
  patchReplyController,
};
