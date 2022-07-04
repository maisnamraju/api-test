import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.find();
    return users;
  }

  async deleteById(id: number): Promise<void> {
    await this.delete({ id });
  }
}
