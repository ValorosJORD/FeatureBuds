import express from 'express';
import {
  createReplyController,
  getRepliesByCommentIdController,
} from '../controllers/ReplyController.js';

const router = express.Router();

//create reply
router.post('/replies', createReplyController);

//get replies
router.get('/replies/comment/:commentId', getRepliesByCommentIdController);

export default router;
