import { AppDataSource } from '../dataSource.js';
import { Project } from '../entities/Project.js';
import { ProjectFile } from '../entities/ProjectFile.js';

const projectRepository = AppDataSource.getRepository(Project);
const projectFileRepository = AppDataSource.getRepository(ProjectFile);

export async function addProject(
  title: string,
  description: string = 'No Description',
): Promise<Project> {
  const newProject = new Project();
  newProject.title = title;
  newProject.description = description;

  return await projectRepository.save(newProject);
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  return await projectRepository.findOne({
    where: { projectId },
    relations: { projectFiles: true },
  });
}

export async function getAllProjects(): Promise<Project[]> {
  return projectRepository.find();
}

export async function addFileToProject(
  projectId: string,
  filePath: string,
  fileSize: number,
  originalName: string,
): Promise<Project | null> {
  const project = await projectRepository.findOne({
    where: { projectId },
    relations: ['projectFiles'],
  });

  if (!project) {
    return null;
  }

  const projectFile = new ProjectFile();
  projectFile.project = project;
  projectFile.filePath = filePath;
  projectFile.fileSize = fileSize;
  projectFile.originalName = originalName;

  await projectFileRepository.save(projectFile);

  return project;
}
