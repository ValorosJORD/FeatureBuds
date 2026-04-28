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
app.get('/api/posts', getPostsController);
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

import {
  AccessUserById,
  getMe,
  logIn,
  logOut,
  registerUser,
  RemoveUserAccount,
} from './controllers/UserRoutes.js';

app.post('/api/users', registerUser);
app.post('/api/login', logIn);
app.delete('/api/sessions', logOut);
app.post('/:userId/delete', RemoveUserAccount);
app.get('/api/users/:userId', AccessUserById);
app.get('/api/me', getMe);

import {
  AccessAllProjects,
  AccessProject,
  CreateProject,
  ProjectFileUpload,
} from './controllers/ProjectRoutes.js';
app.post('/api/projects', requireAuth, CreateProject);
app.get('/api/projects/:projectId', AccessProject);
app.get('/api/projects', AccessAllProjects);

import { requireAuth } from './middleware/AuthRequire.js';
import { uploadErrorHandler, uploadProjectFile } from './uploadConfig.js';

app.post(
  '/api/projects/:projectId',
  requireAuth,
  uploadProjectFile.single('file'),
  ProjectFileUpload,
  uploadErrorHandler,
);

import {
  AccessPermissionByProjectId,
  AccessPermissionByUserId,
  CreatePermission,
} from './controllers/PermissionRoutes.js';
app.post('/projects/:projectId/permissions', CreatePermission);
app.get('/projects/:projectId/permissions', AccessPermissionByProjectId);
app.get('/users/:userId/projects', AccessPermissionByUserId);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
