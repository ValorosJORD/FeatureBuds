import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  commentId!: string;

  @Column()
  userId!: string;

  @Column()
  bodyText!: string;

  @Column({ nullable: true })
  createdAt!: Date;
}
