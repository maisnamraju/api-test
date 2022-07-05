import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserController } from './user.controller';
import { UsersPermissionsService } from './service/userspermissions.service';
import { customUserRepositoryMethods } from './repository/user.repository';
import { User } from './entity/user.entity';
import { UserPermission } from './entity/user-permission.entity';
import { customUserPermissionRepositoryMethods } from './repository/user-permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPermission])],
  controllers: [UserController],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // We Override default repository for Task with a custom one
        return dataSource
          .getRepository(User)
          .extend(customUserRepositoryMethods);
      },
    },
    {
      provide: getRepositoryToken(UserPermission),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // We Override default repository for Task with a custom one
        return dataSource
          .getRepository(UserPermission)
          .extend(customUserPermissionRepositoryMethods);
      },
    },
    UsersPermissionsService,
  ],
})
export class UserModule {}
