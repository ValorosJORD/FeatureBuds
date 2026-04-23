import { AppDataSource } from '../dataSource.js';
import { Project } from '../entities/Project.js';

const projectRepository = AppDataSource.getRepository(Project);

export async function addProject(
  title: string,
  description: string = 'No Description',
): Promise<Project> {
  const newProject = new Project();
  newProject.title = title;
  newProject.description = description;

  return projectRepository.save(newProject);
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  return projectRepository.findOne({ where: { projectId } });
}

export async function getAllProjects(): Promise<Project[]> {
  return projectRepository.find();
}
