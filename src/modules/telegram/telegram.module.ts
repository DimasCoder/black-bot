import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramController } from '@modules/telegram/telegram.controller';
import { ConfigService } from '@nestjs/config';
import { RegisterWizard } from '@modules/telegram/wizards/register.wizard';
import { session } from 'telegraf';

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
          middlewares: [session()],
          token,
        };
      },
    }),
  ],
  providers: [TelegramController, RegisterWizard],
})
export class TelegramModule {}
