import { Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserPermission } from '../entity/user-permission.entity';
import { User } from '../entity/user.entity';
import { UserPermissionRepository } from '../repository/user-permission.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersPermissionsService {
  constructor(
    // private readonly logger: LoggerService,
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
      const userData = {
        firstName,
        lastName,
        phoneNo,
        email,
        addressCoordinates,
        addressText,
        currency,
        locale,
      };
      const user = new User();
      for (const key in userData) {
        user[key] = userData[key];
      }
      await this.userRepo.save(user);

      if (permissions.length > 0) {
        const permission = new UserPermission();
        permission.user = user;
        permission.permissions = permissions;
        await this.userPermissionsRepo.save(permission);
        return { ...user, permissions: permission };
      } else return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(include?: string[]): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, include: string[]): Promise<User> {
    try {
      let query: FindOneOptions<User> = {
        where: { id },
      };
      if (include.length > 0) {
        query = {
          ...query,
          relations: include,
          loadRelationIds: true,
        };
      }
      const user = await this.userRepo.findOne(query);
      if (!user) throw NotFoundException;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, fieldsToUpdate: UpdateUserDto) {
    try {
      const user = await this.findOne(
        id,
        fieldsToUpdate.hasOwnProperty('permissions') ? ['permissions'] : null,
      );

      for (const key in fieldsToUpdate) {
        user[key] = fieldsToUpdate[key];
      }
      this.userRepo.save(user);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
