import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [UserModule, DatabaseModule, TelemetryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
