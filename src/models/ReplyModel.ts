import { AppDataSource } from '../dataSource.js';
import { Reply } from '../entities/Reply.js';

const replyRepository = AppDataSource.getRepository(Reply);

//create reply
const createReply = async (commentId: number, userId: number, bodyText: string): Promise<Reply> => {
  const reply = new Reply();

  reply.commentId = commentId;
  reply.userId = userId;
  reply.bodyText = bodyText;

  return await replyRepository.save(reply);
};

//get replies by comment id

const getRepliesByCommentId = async (commentId: number): Promise<Reply[]> => {
  return await replyRepository.find({
    where: { commentId },
  });
};

export { createReply, getRepliesByCommentId };
