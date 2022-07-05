import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum PermissionType {
  READ = 'Read',
  WRITE = 'Write',
  DELETE = 'Delete',
}

export interface Permission {
  key: string;
  value: PermissionType;
}

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'jsonb',
  })
  permissions: Permission[];

  @OneToOne(() => User, (user) => user.permissions)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
