import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Permission } from './permission.dto';

export class GetUserDto {
  @ApiProperty({
    description: 'An Array containing the relationship fields to query',
    type: Array,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  include?: string[];
}
