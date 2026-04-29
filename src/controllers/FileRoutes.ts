import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { getFileByPath } from '../models/FileModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { FilePathSchema } from '../validators/FileValidator.js';

export async function AccessFile(req: Request, res: Response): Promise<void> {
  const result = FilePathSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { filePath } = result.data;
  path.basename(filePath);
  try {
    const file = await getFileByPath(filePath);
    try {
      await fs.access(file.filePath);
    } catch {
      console.log('failed');
      res.status(404).send('File not found');
      return;
    }
    res.sendFile(path.resolve(file.filePath));
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
    return;
  }
}
