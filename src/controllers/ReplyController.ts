import { Request, Response } from 'express';
import { createReply, getRepliesByCommentId } from '../models/ReplyModel.js';
import { createReplySchema } from '../validators/ReplyValidators.js';

// Create reply
const createReplyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = createReplySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.issues });
      return;
    }

    const { commentId, userId, bodyText } = result.data;
    const reply = await createReply(commentId, userId, bodyText);
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reply' });
  }
};

// Get replies by comment id
const getRepliesByCommentIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = Number(req.params.commentId);
    if (isNaN(commentId)) {
      res.status(400).json({ error: 'Invalid comment id' });
      return;
    }

    const replies = await getRepliesByCommentId(commentId);
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get replies' });
  }
};

export { createReplyController, getRepliesByCommentIdController };
