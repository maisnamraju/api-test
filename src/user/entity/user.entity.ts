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
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  firstName: string;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  lastName: string;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  @Unique('phoneNo', ['phoneNo'])
  phoneNo: string;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  @Unique('email', ['email'])
  email: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Locale,
    default: Locale.EN,
  })
  locale: Locale;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  addressText: string;

  @ApiProperty()
  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  addressCoordinates?: Point;

  @ApiProperty({
    type: () => UserPermission,
  })
  @OneToOne(() => UserPermission, (permissions) => permissions.user, {
    onDelete: 'CASCADE',
  })
  permissions?: UserPermission;

  @ApiProperty()
  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;

  @VersionColumn()
  version?: number;
}
