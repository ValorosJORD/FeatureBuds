// src/controllers/UserRoutes.ts
import argon2 from 'argon2';
import { Request, Response } from 'express';
import { addUser, deleteUser, getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { LogInSchema, RegistrationSchema } from '../validators/authValidator.js';

export async function registerUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password, username, name } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(email, passwordHash, username, name);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function logIn(req: Request, res: Response): Promise<void> {
  const result = LogInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }

    await req.session.clearSession();

    req.session.authenticatedUser = {
      userId: user.userId,
      email: user.email,
      displayName: user.username,
    };
    req.session.isLoggedIn = true;

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function logOut(req: Request, res: Response): Promise<void> {
  if (req.session.authenticatedUser) {
    console.log(`${req.session.authenticatedUser.userId} logged out.`);
  } else {
    console.log('No logged in user.');
  }
  await req.session.clearSession();
  res.sendStatus(204);
}

export async function RemoveUserAccount(req: Request, res: Response): Promise<void> {
  const result = LogInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }

    await deleteUser(email, passwordHash);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export function getMe(req: Request, res: Response): void {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }

  res.json(req.session.authenticatedUser);
}
