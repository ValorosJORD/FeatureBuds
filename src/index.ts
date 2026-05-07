import express, { Express } from 'express';
import path from 'path';

import './config.js'; // do not remove this line
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  getProjectPostsController,
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

app.get('/debug-file', (req, res) => {
  res.sendFile(
    path.resolve(process.cwd(), 'uploads/projects/019dd675-2a2d-76b3-9810-e44187ed3ddc.mp3'),
  );
});

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware

app.use(express.static('frontend/build'));

app.use('/uploads', express.static('uploads'));

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------
// Register your routes below this line
//posts
app.post('/api/posts', createPostController);
app.get('/api/posts', getPostsController);
app.get('/api/posts/:postId', getPostByIdController);
app.get('/api/projects/:projectId/posts', getProjectPostsController);
app.patch('/api/posts/:postId', patchPostController);
app.delete('/api/posts/:postId', deletePostController);

//comments
app.post('/api/projects/:projectId/comments', createProjectCommentController);
app.get('/api/projects/:projectId/comments', getProjectCommentsController);
app.get('/api/comments/:commentId', getProjectCommentByIdController);
app.patch('/api/comments/:commentId', patchCommentController);
app.delete('/api/comments/:commentId', deleteProjectCommentController);

//replies
app.post('/api/replies', createReplyController);
app.get('/api/replies', getReplyController);
app.get('/api/replies/:replyId', getReplyByIdController);
app.patch('/api/replies/:replyId', patchReplyController);
app.delete('/api/replies/:replyId', deleteReplyController);

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
  uploadProjectFile.array('files'),
  ProjectFileUpload,
  uploadErrorHandler,
);

import {
  AccessPermissionByProjectId,
  AccessPermissionByUserId,
  CreatePermission,
} from './controllers/PermissionRoutes.js';
app.post('/api/projects/:projectId/permissions', CreatePermission);
app.get('/api/projects/:projectId/permissions', AccessPermissionByProjectId);
app.get('/api/users/:userId/projects', AccessPermissionByUserId);

import { AccessFile } from './controllers/FileRoutes.js';
app.get('/api/uploads/projects/:filePath', AccessFile);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
