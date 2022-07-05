import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from './db.config';

export const connectionSource = new DataSource(
  config() as unknown as PostgresConnectionOptions,
);
