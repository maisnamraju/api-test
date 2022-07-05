import { NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import type { User } from '../entity/user.entity';

export interface UserRepository extends Repository<User> {
  this: Repository<User>;

  getById(id: number): Promise<User>;

  getAll(): Promise<User[]>;

  //   create(user: User): Promise<User>;

  //   update(id: number, user: User): Promise<User>;

  deleteById(id: number): Promise<void>;
}

export const customUserRepositoryMethods: Pick<
  UserRepository,
  'getById' | 'getAll' | 'deleteById'
> = {
  async getById(this: Repository<User>, id: number) {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  },

  //   async create(this: Repository<User>) {
  //     return await this.save(user);
  //   },

  async getAll(this: Repository<User>) {
    const users = await this.find();
    return users;
  },

  async deleteById(this: Repository<User>, id: number) {
    await this.delete({ id });
  },
};
//TODO - wait for the new typeorm integration and upgrade to the new standard once @next is released from beta
// @EntityRepository(User)
// export class UserRepository extends Repository<User> {

// }
