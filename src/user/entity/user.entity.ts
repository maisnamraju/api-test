import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { UserPermission } from './user-permission.entity';
import { Point } from 'geojson';

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
  @Unique('phoneNo', ['phoneNo'])
  phoneNo: string;

  @Column('varchar', { length: 200 })
  @Unique('email', ['email'])
  email: string;

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

  @Column('varchar', { length: 200 })
  addressText: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  addressCoordinates?: Point;

  @OneToOne(() => UserPermission, (permissions) => permissions.user, {
    onDelete: 'CASCADE',
  })
  permissions: UserPermission[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
