import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToMany,
} from 'typeorm';
import { UserPermissions } from './user-permissions.entity';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  SAR = 'SAR',
}

export enum Locale {
  EN = 'en',
  AR = 'ar',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  firstName: string;

  @Column('varchar', { length: 200 })
  lastName: string;

  @Column('varchar', { length: 200 })
  phoneNo: string;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @Column({
    type: 'enum',
    enum: Locale,
    default: Locale.EN,
  })
  locale: Locale;

  @Column()
  addressText: string;

  @Column()
  addressCoordinates: object;

  @OneToMany((type) => UserPermissions, (permissions) => permissions.user)
  permissions: UserPermissions[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
