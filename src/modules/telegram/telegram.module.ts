import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from '@modules/telegram/telegram.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const token = config.get<string>('telegram.botToken');

        if (!token) {
          throw new Error(
            'Telegram bot token is not defined in environment variables',
          );
        }

        return {
          token,
        };
      },
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
