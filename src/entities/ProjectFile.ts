// PLACEHOLDER FOR WHEN I FIGURE OUT WHAT I'M DOING WITH MULTER
import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { Project } from './Project.js';

@Entity()
export class ProjectFile {
  @PrimaryColumn()
  filePath: string;

  @Column()
  fileSize: number;

  @ManyToOne(() => Project, (project) => project.projectFiles)
  project: Relation<Project>;
}
