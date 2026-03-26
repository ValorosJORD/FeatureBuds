// src/models/ReplyModel.ts
//read/write the database
import { AppDataSource } from '../dataSource.js';
import { Reply } from '../entities/Reply.js';

const ReplyRepository = AppDataSource.getRepository(Reply);

// Create -> make Reply and save...
async function createReply(userId: string, commentId: string, bodyText: string): Promise<Reply> {
  const newReply = new Reply();
  newReply.userId = userId;
  newReply.commentId = commentId;
  newReply.bodyText = bodyText;

  return ReplyRepository.save(newReply);
}

//Get all replies
async function getAllReplies(): Promise<Reply[]> {
  return ReplyRepository.find();
}

//Get one reply by Id
async function getReplyById(replyId: string): Promise<Reply | null> {
  return ReplyRepository.findOne({ where: { replyId } });
}

export { createReply, getAllReplies, getReplyById };
