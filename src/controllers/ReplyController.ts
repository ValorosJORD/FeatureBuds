import { Request, Response } from 'express';
import { createReply, getAllReplies, getReplyById } from '../models/ReplyModel.js';
import { CreateReplySchema } from '../validators/ReplyValidators.js';

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

export { createReplyController, getReplyByIdController, getReplyController };
