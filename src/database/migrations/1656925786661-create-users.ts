import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createUsers1656925786661 implements MigrationInterface {
  name = 'createUsers1656925786661';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'phoneNo',
            type: 'varchar',
            length: '200',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '200',
            isUnique: true,
          },
          {
            name: 'currency',
            type: 'enum',
            enum: ['USD', 'EUR', 'GBP', 'SAR'],
            default: 'USD',
          },
          {
            name: 'locale',
            type: 'enum',
            enum: ['AR', 'EN'],
            default: 'EN',
          },
          {
            name: 'addressText',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'addressCoordinates',
            type: 'jsonb',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
          {
            name: 'version',
            type: 'int',
          },
        ],
      }),
      true,
      false,
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_permission',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'permissions',
            type: 'jsonb',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
          {
            name: 'version',
            type: 'int',
          },
        ],
      }),
      true,
      false,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user" CASCADE');
    await queryRunner.query('DROP TABLE "user_permission" CASCADE');
  }
}
