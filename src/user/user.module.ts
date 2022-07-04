import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersPermissionsService } from './service/userspermissions.service';

@Module({
  controllers: [UserController],
  providers: [UsersPermissionsService],
})
export class UserModule {}
