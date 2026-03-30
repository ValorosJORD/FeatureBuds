import express, { Express } from 'express';
import './config.js'; // do not remove this line
import {
  createPostController,
  getPostByIdController,
  getPostsController,
} from './controllers/PostController.js';

import {
  createProjectCommentController,
  getProjectCommentByIdController,
  getProjectCommentsController,
} from './controllers/ProjectCommentController.js';

import {
  createReplyController,
  getReplyByIdController,
  getReplyController,
} from './controllers/ReplyController.js';

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

//comments
app.post('/comments', createProjectCommentController);
app.get('/comments', getProjectCommentsController);
app.get('/comments/:commentId', getProjectCommentByIdController);

//replies
app.post('/replies', createReplyController);
app.get('/replies', getReplyByIdController);
app.get('/replies/:commentId', getReplyController);
import { logIn, logOut, registerUser } from './controllers/UserRoutes.js';

app.post('/users', registerUser);
app.post('/login', logIn);
app.delete('/sessions', logOut);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
