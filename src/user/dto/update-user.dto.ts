import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsEmail,
  Matches,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Point } from 'geojson';
import { PermissionType } from '../entity/user-permission.entity';
import { Currency, Locale } from '../entity/user.entity';
import { CreateUserDto } from './create-user.dto';
import { Permission } from './permission.dto';

export class UpdateUserDto extends CreateUserDto {
  constructor() {
    super();
    // this.validateRequiredFields = true;
  }
  @ApiProperty({
    name: 'id',
    required: false,
    example: 1,
    description: 'Id of the user',
  })
  id: number;
}
