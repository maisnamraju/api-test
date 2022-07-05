import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Currency, Locale } from '../entity/user.entity';
import {
  Permission as PermissionEntity,
  PermissionType,
} from '../entity/user-permission.entity';
import { Point } from 'geojson';
import { Type } from 'class-transformer';
import { Permission } from './permission.dto';

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
  // source: https://stackoverflow.com/questions/2113908/what-regular-expression-will-match-valid-international-phone-numbers
  @Matches(
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
    {
      message: 'Phone number should be in the following format +629177511964',
    },
  )
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
    name: 'locale',
    enum: Locale,
    description: 'The locale of the user: en, ar',
  })
  locale: Locale;

  @ApiProperty({
    name: 'addressText',
    description: 'address of the user',
  })
  addressText?: string;

  @ApiProperty({
    name: 'addressCoordinates',
    required: false,
    example: {
      type: 'Point',
      coordinates: [125.6, 10.1],
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
  @IsArray({})
  @ValidateNested({ each: true })
  @Type(() => Permission)
  permissions?: PermissionEntity[];
}
