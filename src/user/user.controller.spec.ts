import { faker } from '@faker-js/faker';
import { build, perBuild, sequence } from '@jackfranklin/test-data-bot';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { Currency, Locale, User } from './entity/user.entity';
import { UsersPermissionsService } from './service/userspermissions.service';
import {
  PermissionType,
  UserPermission,
} from './entity/user-permission.entity';
import { Permission } from './dto/permission.dto';

const userBuilder = build<User>({
  fields: {
    id: sequence(),
    firstName: perBuild(() => faker.name.firstName()),
    lastName: perBuild(() => faker.name.lastName()),
    phoneNo: perBuild(() => faker.phone.number('+9191775111964')),
    email: perBuild(() => faker.internet.email()),
    locale: perBuild(() => Locale.EN),
    addressText: perBuild(() => faker.address.streetAddress()),
    addressCoordinates: perBuild(() => ({
      type: 'Point',
      coordinates: faker.address.nearbyGPSCoordinate().map((item) => +item),
    })),
    currency: Currency.SAR,
    version: 1,
    permissions: {
      id: 1,
      permissions: [
        {
          key: 'invoicing',
          value: PermissionType.READ,
        },
      ],
      createdAt: perBuild(() => faker.date.recent()),
      updatedAt: perBuild(() => faker.date.recent()),
      version: 1,
    },
    createdAt: perBuild(() => faker.date.recent()),
    updatedAt: perBuild(() => faker.date.recent()),
  },
  postBuild(task) {
    return Object.assign(new User(), task);
  },
});

const UserPermissionsServiceMock = jest.fn().mockImplementation(() => {
  const users = Array.from({ length: 10 }, () => userBuilder());

  return {
    findAll: jest.fn().mockResolvedValue(users),
    findOne: jest.fn().mockImplementation(
      (id: number, includeFields?: string[]) =>
        new Promise((resolve, reject) => {
          if (id === 0) resolve(null);
          const permission = users[0].permissions;
          delete users[0].permissions;
          const returnObj = {
            ...users[0],
            id: id,
          };
          if (
            includeFields != undefined &&
            includeFields.includes('permissions')
          ) {
            returnObj.permissions = permission;
          }
          resolve(returnObj);
        }),
    ),
    create: jest
      .fn()
      .mockImplementation(({}: CreateUserDto) =>
        Promise.resolve(userBuilder({ overrides: { firstName: 'Facundo' } })),
      ),
    update: jest.fn().mockImplementation(
      (id: number, updates: UpdateUserDto) =>
        new Promise((resolve, reject) => {
          if (id < 1) {
            reject(
              new NotFoundException(`There isn't any user with id: ${id}`),
            );
          } else {
            const permissions = Object.assign({}, updates.permissions);
            const user: Partial<User> = {
              firstName: updates.firstName,
              lastName: updates.lastName,
              phoneNo: updates.phoneNo,
              email: updates.email,
              locale: updates.locale,
              addressText: updates.addressText,
              addressCoordinates: updates.addressCoordinates,
              currency: updates.currency,
              version: 1,
              // this is just to make the whole thing compatible with the UserPermissionService
            };
            if (updates.permissions) {
              user.permissions = {
                id: 1,
                permissions,
                version: 1,
              };
            }
            resolve(userBuilder({ overrides: { id, ...user } }));
          }
        }),
    ),
    remove: jest.fn().mockResolvedValue({
      raw: [],
      affected: 1,
    }),
  };
});

describe('User Controller', () => {
  let controller: UserController;
  const userCheck = {
    id: expect.any(Number),
    addressText: expect.any(String),
    addressCoordinates: expect.any(Object),
    currency: expect.any(String),
    email: expect.any(String),
    firstName: expect.any(String),
    lastName: expect.any(String),
    locale: expect.any(String),
    phoneNo: expect.any(String),
    version: expect.any(Number),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersPermissionsService,
          useClass: UserPermissionsServiceMock,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all the users', async () => {
    const all = await controller.findAll();
    expect(Array.isArray(all)).toBe(true);
  });

  it('should get one user with permissions', async () => {
    const user = await controller.findOne(`1`, ['permissions']);
    expect(user).toEqual({
      permissions: {
        id: expect.any(Number),
        permissions: expect.any(Array),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        version: expect.any(Number),
      },
      ...userCheck,
    });
  });

  it('should get one user without permissions', async () => {
    const userResponse = await controller.findOne(`1`);
    expect(userResponse).not.toHaveProperty('permissions');
    expect(userCheck).toEqual(userCheck);
  });

  it('fail to get one user when id not in db', async (done) => {
    try {
      await controller.findOne(`0`);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      done();
    }
  });

  it('should create a user', async () => {
    const user = userBuilder();
    const createUserData = {
      ...user,
      permissions: user.permissions[0].permissions,
    };
    it('should create one user with permissions', async () => {
      await expect(controller.create(createUserData)).resolves.toReturnWith({
        id: user.id,
      });
    });

    it('should create one user without permissions', async () => {
      delete createUserData.permissions;
      await expect(controller.create(createUserData)).resolves.toMatchObject({
        id: expect.any(Number),
        title: 'Make a sandwich',
        done: false,
      });
    });
  });

  //   it('should update one user', async () => {
  //     // await expect(
  //     //   controller.update(`1`, { firstName: 'John', lastName: 'Doe' }),
  //     // ).resolves.toMatchObject({
  //     //   id: 1,
  //     //   firstName: 'John',
  //     //   lastName: 'Doe',
  //     // });
  //   });

  //   it('fail to update one user', async () => {
  //     // await expect(
  //     //   controller.update(`0`, { firstName: 'John', lastName: 'Doe' }),
  //     // ).rejects.toThrow();
  //   });

  //   //   it('should mark one task as done', async () => {
  //   //     await expect(controller.markDone(1)).resolves.toMatchObject({
  //   //       id: 1,
  //   //       title: expect.any(String),
  //   //       done: true,
  //   //     });
  //   //   });

  //   //   it('should mark one task as pending', async () => {
  //   //     await expect(controller.markPending(1)).resolves.toMatchObject({
  //   //       id: 1,
  //   //       title: expect.any(String),
  //   //       done: false,
  //   //     });
  //   //   });

  //   it('should remove one task', async () => {
  //     await expect(controller.remove(`1`)).resolves.toMatchObject({
  //       raw: [],
  //       affected: 1,
  //     });
  //   });
});
