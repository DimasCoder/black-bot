import { TelegramController } from '@modules/telegram/telegram.controller';
import { TelegramUtils } from '@modules/telegram/telegram.utils';
import { GreetingWizard } from '@modules/telegram/wizards/greeting.wizard';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
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
    UserModule,
  ],
  providers: [TelegramController, GreetingWizard, TelegramUtils],
})
export class TelegramModule {}
