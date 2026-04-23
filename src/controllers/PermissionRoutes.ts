// src/controllers/PermissionRoutes.ts
import { Request, Response } from 'express';
import {
  addPermission,
  getPermission,
  getPermissionsByProjectId,
  getPermissionsByUserId,
} from '../models/PermissionModel.js';
import { getProjectById } from '../models/ProjectModel.js';
import { getUserById } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { PermissionIdSchema } from '../validators/PermissionValidator.js';
import { ProjectIdSchema } from '../validators/ProjectValidator.js';
import { UserIdSchema } from '../validators/authValidator.js';

export async function CreatePermission(req: Request, res: Response): Promise<void> {
  const projResult = ProjectIdSchema.safeParse(req.params);
  const bodyResult = PermissionIdSchema.safeParse(req.body);

  const { projectId } = projResult.data;
  const { userId, permissionType } = bodyResult.data;
  if ((await getUserById(userId)) == null) {
    res.status(404).json(`User ID Not Found.`);
    return;
  }
  if ((await getProjectById(projectId)) == null) {
    res.status(404).json(`Project ID Not Found.`);
    return;
  }
  if (await getPermission(userId, projectId)) {
    console.log(`Working.`);
    res.status(400).json(`Permission Already Exists.`);
    return;
  }

  try {
    const newPermission = await addPermission(projectId, userId, permissionType);
    console.log(newPermission);
    res.sendStatus(201);
    return;
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
    return;
  }
}

export async function AccessPermissionByProjectId(req: Request, res: Response): Promise<void> {
  const result = ProjectIdSchema.safeParse(req.params);

  const { projectId } = result.data;
  if ((await getProjectById(projectId)) == null) {
    res.status(404).json(`Project Does Not Exist.`);
    return;
  }

  try {
    const permission = await getPermissionsByProjectId(projectId);
    res.status(201).json(permission);
    return;
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
    return;
  }
}

export async function AccessPermissionByUserId(req: Request, res: Response): Promise<void> {
  const result = UserIdSchema.safeParse(req.params);

  const { userId } = result.data;
  if ((await getUserById(userId)) == null) {
    res.status(404).json(`User Does Not Exist.`);
  }

  try {
    res.sendStatus(201).json(await getPermissionsByUserId(userId));
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

/**
export async function AccessAllPermissions(req: Request, res: Response): Promise<void> {
  try {
    const permissions = await getAllPermissions();
    res.status(200).json(permissions);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}
*/
