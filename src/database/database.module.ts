import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number | undefined>('DB_PORT'),
        database: configService.get<string>('DB_DATABASE_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // fetches all the entities from the different modules
        timezone: 'Z', // set to universal time zone utc
        synchronize:
          configService.get<string>('NODE_ENV') === 'development'
            ? true
            : false,
        debug: configService.get<string>('NODE_ENV') === 'development', // useful for debugging queries during development
      }),
    }),
  ],
})
export class DatabaseModule {}
