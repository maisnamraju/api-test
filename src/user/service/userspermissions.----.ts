import { Test, TestingModule } from '@nestjs/testing';
import { UsersPermissionsService } from './userspermissions.service';

describe('UsersPermissionsService', () => {
  let service: UsersPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPermissionsService],
    }).compile();

    service = module.get<UsersPermissionsService>(UsersPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
