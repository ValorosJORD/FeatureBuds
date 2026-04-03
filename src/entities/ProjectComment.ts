// src/entities/ProjectComment.ts
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

//message-ID
//user
//body-text
//Date

@Entity()
export class ProjectComment {
  //comment ID
  @PrimaryColumn()
  commentId: string;

  //ID
  @BeforeInsert()
  generateId(): void {
    this.commentId = uuidv7();
  }

  //user ID
  @Column()
  userId: string;

  //contents
  @Column()
  bodyText: string;

  //time
  @CreateDateColumn()
  createdAt: Date;
}
