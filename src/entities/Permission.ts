import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryColumn()
  projectId: string;

  @Column()
  userId: string;

  @Column()
  permission: `BANNED` | `VIEWER` | `EDITOR` | `ADMIN`;

  @CreateDateColumn()
  permissionGrantedAt: Date;
}
