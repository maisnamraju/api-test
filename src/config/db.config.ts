import { registerAs } from '@nestjs/config';
export const config = () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  timezone: 'Z', // set to universal time zone utc
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  debug: process.env.NODE_ENV === 'development', // useful for debugging queries during development
  entities: ['dist/**/*.entity.js'],
  autoLoadEntities: true,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'dist/database/migrations',
  },
});

export default registerAs('database', () => {
  return config();
});
