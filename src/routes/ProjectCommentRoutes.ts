import express from 'express';
import {
  createProjectCommentController,
  getProjectCommentByIdController,
  getProjectCommentsController,
} from '../controllers/ProjectCommentController.js';

const router = express.Router();

// create comment
router.post('/comments', createProjectCommentController);

// get comments
router.get('/comments', getProjectCommentsController);

// get one comment by id
router.get('/comments/:id', getProjectCommentByIdController);

export default router;
