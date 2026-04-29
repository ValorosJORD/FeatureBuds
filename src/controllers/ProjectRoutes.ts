// src/controllers/ProjectRoutes.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import {
  addFileToProject,
  addProject,
  getAllProjects,
  getProjectById,
} from '../models/ProjectModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import {
  FileBodySchema,
  ProjectCreationSchema,
  ProjectIdSchema,
} from '../validators/ProjectValidator.js';

export async function CreateProject(req: Request, res: Response): Promise<void> {
  const result = ProjectCreationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { title, description } = result.data;

  try {
    if (description) {
      const newProject = await addProject(title, description);
      console.log(newProject);
      res.status(201).json(newProject);
    } else {
      const newProject = await addProject(title);
      console.log(newProject);
      res.status(201).json(newProject);
    }
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function AccessProject(req: Request, res: Response): Promise<void> {
  const result = ProjectIdSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { projectId } = result.data;
  try {
    const project = await getProjectById(projectId);
    if (project === null) {
      res.status(404).json('Project Not Found.');
    } else {
      console.log(project);
      res.status(200).json(project);
    }
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function AccessAllProjects(req: Request, res: Response): Promise<void> {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function ProjectFileUpload(req: Request, res: Response): Promise<void> {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    res.status(400).json({ error: 'No file uploaded or file rejected' });
    return;
  }
  const result = ProjectIdSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { projectId } = result.data;

  const parseResult = FileBodySchema.safeParse(req.body);
  if (!parseResult.success) {
    await Promise.all(files.map((f) => fs.unlink(f.path)));
    res.status(400).json(parseResult.error);
    return;
  }

  try {
    const uploadResults = await Promise.all(
      files.map((file) => addFileToProject(projectId, file.path, file.size, file.originalname)),
    );
    if (uploadResults.includes(null)) {
      await Promise.all(files.map((f) => fs.unlink(f.path)));
      console.log('Failed with null upload');
      res.sendStatus(404);
      return;
    }
    res.status(201).json(uploadResults);
  } catch (err) {
    console.error(err);
    await Promise.all(files.map((f) => fs.unlink(f.path)));
    res.sendStatus(500);
  }
}
