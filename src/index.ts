import express, { Express } from 'express';
import './config.js'; // do not remove this line
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  patchPostController,
} from './controllers/PostController.js';

import {
  createProjectCommentController,
  deleteProjectCommentController,
  getProjectCommentByIdController,
  getProjectCommentsController,
  patchCommentController,
} from './controllers/ProjectCommentController.js';

import {
  createReplyController,
  deleteReplyController,
  getReplyByIdController,
  getReplyController,
  patchReplyController,
} from './controllers/ReplyController.js';

import { logIn, logOut, registerUser } from './controllers/UserRoutes.js';
import { sessionMiddleware } from './sessionConfig.js';

const app: Express = express();

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------
// Register your routes below this line

//posts
app.post('/posts', createPostController);
app.get('/posts', getPostsController);
app.get('/posts/:postId', getPostByIdController);
app.patch('/posts/:postId', patchPostController);
app.delete('/posts/:postId', deletePostController);

//comments
app.post('/comments', createProjectCommentController);
app.get('/comments', getProjectCommentsController);
app.get('/comments/:commentId', getProjectCommentByIdController);
app.patch('/comments/:commentId', patchCommentController);
app.delete('/comments/:commentId', deleteProjectCommentController);

//replies
app.post('/replies', createReplyController);
app.get('/replies', getReplyController);
app.get('/replies/:replyId', getReplyByIdController);
app.patch('/replies/:replyId', patchReplyController);
app.delete('/replies/:replyId', deleteReplyController);

app.post('/users', registerUser);
app.post('/login', logIn);
app.delete('/sessions', logOut);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
