// src/controllers/ProjectRoutes.ts
import { Request, Response } from 'express';
import { addProject, getAllProjects, getProjectById } from '../models/ProjectModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { ProjectCreationSchema, ProjectIdSchema } from '../validators/ProjectValidator.js';

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
      res.sendStatus(201);
    } else {
      const newProject = await addProject(title);
      console.log(newProject);
      res.sendStatus(201);
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
