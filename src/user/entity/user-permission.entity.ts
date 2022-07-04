import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export interface Permission {
  key: string;
  value: 'Read' | 'Write' | 'Delete';
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
