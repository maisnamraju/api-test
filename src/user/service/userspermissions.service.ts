import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersPermissionsService {
  constructor() {}

  create(data: CreateUserDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, data: UpdateUserDto) {}

  remove(id: number) {}
}
