import { Connection, getManager } from 'typeorm';
// import { define } from 'typeorm-seeding';

// import { RoleType } from '../../constants';
// import { UserEntity } from '../../modules/user/entity/user.entity';

// define(UserEntity, (faker) => {
//   const gender = faker.random.number(1);
//   const firstName = faker.name.firstName(gender);
//   const lastName = faker.name.lastName(gender);
//   const email = faker.internet.email(firstName, lastName);
//   const phone = faker.phone.phoneNumber();

//   const user = new UserEntity();
//   user.firstName = firstName;
//   user.lastName = lastName;
//   user.email = email;
//   user.password = '111111';
//   user.phone = phone;

//   return user;
// });

// export class SetupData {
//   //   public async run(factory: Factory, connection: Connection): Promise<void> {}
// }
