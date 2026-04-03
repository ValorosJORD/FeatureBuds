// src/entities/Reply.ts
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

//reply-ID
//commentId
//userId
//bodyText
//createdAt

@Entity()
export class Reply {
  //comment ID
  @PrimaryColumn()
  replyId: string;

  //ID
  @BeforeInsert()
  generateId(): void {
    this.replyId = uuidv7();
  }

  @Column() // which commment this belongs to
  commentId: string;

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
