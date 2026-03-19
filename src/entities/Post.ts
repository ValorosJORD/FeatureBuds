import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { uuidv7 } from 'uuidv7'; //unique ID

@Entity()
export class Post {
  @PrimaryColumn()
  id!: string;

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column()
  bodyText!: string;

  @Column()
  topic!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @BeforeInsert()
  setId() {
    this.id = uuidv7();
  }
}
