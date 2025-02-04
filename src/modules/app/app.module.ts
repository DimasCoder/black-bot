import config from '@config';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { TelegramModule } from '@modules/telegram/telegram.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
