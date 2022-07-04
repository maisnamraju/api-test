import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersPermissionsService {
  constructor(
    private readonly userRepo: UserRepository, // private readonly permissionsRepo: Permissi
  ) {}

  async create({
    firstName,
    lastName,
    phoneNo,
    email,
    addressCoordinates,
    currency,
    addressText,
    locale,
  }: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepo.create({
        firstName,
        lastName,
        phoneNo,
        email,
        addressCoordinates,
        addressText,
        currency,
        locale,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  findAll() {}

  findOne(id: number) {}

  update(id: number, data: UpdateUserDto) {}

  remove(id: number) {}
}
