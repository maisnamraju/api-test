import type { Repository } from 'typeorm';
import { UserPermission } from '../entity/user-permission.entity';

export interface UserPermissionRepository extends Repository<UserPermission> {
  this: Repository<UserPermission>;

  getByUserId(userId: number): Promise<void>;
}

export const customUserPermissionRepositoryMethods: Pick<
  UserPermissionRepository,
  'getByUserId'
> = {
  async getByUserId(this: Repository<UserPermission>, userId: number) {
    // return this.find({
    //   where: {},
    // });
  },
};
