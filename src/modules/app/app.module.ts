import config from '@config/env.config';
import AppDataSource from '@config/typeorm.config';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { TelegramModule } from '@modules/telegram/telegram.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TelegramModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
