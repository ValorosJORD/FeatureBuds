import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { uuidv7 } from 'uuidv7'; //unique ID
@Entity()
export class ProjectComment {
  @PrimaryColumn()
  id!: string;

  @Column()
  projectId!: string;

  @Column()
  userId!: string;

  @Column()
  bodyText!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @BeforeInsert()
  setId() {
    this.id = uuidv7();
  }
}
