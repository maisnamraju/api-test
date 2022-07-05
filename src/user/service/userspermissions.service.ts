import { Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserPermission } from '../entity/user-permission.entity';
import { User } from '../entity/user.entity';
import { UserPermissionRepository } from '../repository/user-permission.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersPermissionsService {
  constructor(
    @InjectRepository(User) private readonly userRepo: UserRepository,
    @InjectRepository(UserPermission)
    private readonly userPermissionsRepo: UserPermissionRepository,
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
    permissions,
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
      await this.userRepo.save(user);
      if (permissions.length > 0) {
        // user.permissions = Permissions.create(permissions);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {}

  findUserPermissions(id: number) {}

  update(id: number, data: UpdateUserDto) {}

  remove(id: number) {}
}
