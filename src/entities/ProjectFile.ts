// PLACEHOLDER FOR WHEN I FIGURE OUT WHAT I'M DOING WITH MULTER
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project.js';

@Entity()
export class ProjectFile {
  @PrimaryColumn()
  filePath: string;

  @Column()
  fileSize: number;

  @Column()
  originalName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastEdited: Date;

  @ManyToOne(() => Project, (project) => project.projectFiles)
  project: Relation<Project>;
}
