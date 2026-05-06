// src/entities/Post.ts
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Post {
  @PrimaryColumn()
  postId: string;

  //ID
  @BeforeInsert()
  generateId(): void {
    this.postId = uuidv7();
  }

  @Column({ nullable: true })
  projectId: string;
  //プロジェクトIDがなくてもエラーにしない。

  //who's post
  @Column()
  userId: string;

  //title
  @Column()
  title: string;

  //categories
  @Column()
  topic: string;

  //contents
  @Column()
  bodyText: string;

  //time
  @CreateDateColumn()
  createdAt: Date;
}
