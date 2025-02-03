import { Module } from '@nestjs/common';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from '@modules/telegram/telegram.module';
import config from '@config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
