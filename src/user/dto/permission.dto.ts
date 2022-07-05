import { IsEnum, IsString } from 'class-validator';
import { PermissionType } from '../entity/user-permission.entity';

export class Permission {
  @IsString()
  key: string;

  @IsEnum(PermissionType)
  value: PermissionType;
}
