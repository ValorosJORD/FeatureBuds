import { Like } from 'typeorm';
import { AppDataSource } from '../dataSource.js';
import { ProjectFile } from '../entities/ProjectFile.js';

const fileRepository = AppDataSource.getRepository(ProjectFile);

export async function getFileByPath(filePath: string) {
  return await fileRepository.findOne({ where: { filePath: Like(`%${filePath}%`) } });
}
