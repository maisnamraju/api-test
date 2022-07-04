import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  IsArray,
} from 'class-validator';
import { Currency } from '../entity/user.entity';
import { Permission, PermissionType } from '../entity/user-permission.entity';
import { Point } from 'geojson';

export class CreateUserDto {
  @ApiProperty({
    name: 'firstName',
    required: true,
    example: 'Facundo',
    description:
      'First name of the user, should be a minimum of 2 characters and maximum of 20 characters',
  })
  @IsString()
  @Length(2, 20)
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    required: true,
    example: 'Rua',
    description:
      'Last name of the user, should be a minimum of 2 characters and maximum of 20 characters',
  })
  @IsString()
  @Length(2, 20)
  lastName: string;

  @ApiProperty({
    name: 'email',
    required: true,
    example: 'customer@zid.sa',
    description:
      'Email of the user, should be a valid email address and unique',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'phoneNo',
    required: true,
    example: '+629177511964',
    description: `Phone number, a mix of country code and phone number`,
  })
  @IsString()
  @Matches(/^\+?[0-9]{1,3}?[0-9]{7,12}$/, {
    message: 'Phone number should be in the following format +629177511964',
  })
  phoneNo: string;

  @ApiProperty({
    name: 'currency',
    enum: Currency,
    required: true,
    description:
      'the users currency, can be one of the following: USD, EUR, GBP, SAR',
  })
  @IsString()
  currency: Currency;

  @ApiProperty({
    name: 'addressCoordinates',
    required: false,
    example: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [125.6, 10.1],
      },
      properties: {
        name: 'Dinagat Islands',
      },
    },
    description: 'geoJSON object pointing to the user`s location',
  })
  @IsOptional()
  addressCoordinates?: Point;

  @ApiProperty({
    name: 'permissions',
    description: 'user permissions',
    example: [
      {
        key: 'invoicing',
        value: PermissionType.READ,
      },
      {
        key: 'merchant-shipping-info',
        value: PermissionType.WRITE,
      },
      {
        key: 'merchant-payment-info',
        value: PermissionType.READ,
      },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  permissions?: Permission[];
}
