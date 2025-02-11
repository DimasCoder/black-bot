import { COMMANDS } from '@modules/telegram/telegram.commands';
import { BOT_MESSAGES } from '@modules/telegram/telegram.messages';
import { TelegramUtils } from '@modules/telegram/telegram.utils';
import { UserService } from '@modules/user/user.service';
import { Logger } from '@nestjs/common';
import { Command, Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';

@Update()
export class TelegramController {
  private readonly logger: Logger;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
    private readonly tgUtils: TelegramUtils,
  ) {
    this.bot.telegram.setMyCommands(COMMANDS);
    this.logger = new Logger('TelegramController');
  }

  @Start()
  async onStartCommand(@Ctx() ctx: SceneContext<Context>) {
    const telegramUser = ctx.from;

    if (!telegramUser) {
      await ctx.reply(BOT_MESSAGES.ERRORS.GENERAL);
      return;
    }

    const existingUser = await this.userService.findOne(telegramUser.id);

    if (!existingUser) {
      await ctx.scene.enter('greeting');
      return;
    }

    await ctx.reply(
      BOT_MESSAGES.GREETING.EXISTING_USER_GREETING(
        this.tgUtils.getUserDisplayName(existingUser),
      ),
    );
  }

  @Command('random')
  async onRandomCommand(@Ctx() ctx: Context) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    await ctx.reply(`🎲 Ваше випадкове число: ${randomNumber}`);
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    await ctx.reply(
      'Список доступних команд:\n' +
        '/start - Почати роботу з ботом\n' +
        '/random - Отримати випадкове число від 1 до 100\n' +
        '/help - Список доступних команд',
    );
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    const message = ctx.text;

    if (message?.startsWith('/')) {
      await ctx.reply(
        'Невідома команда\n' +
          'Список доступних команд:\n' +
          '/start - Почати роботу з ботом\n' +
          '/random - Отримати випадкове число від 1 до 100\n' +
          '/help - Список доступних команд',
      );
      return;
    }

    this.logger.log(`Received message: ${message}`);

    await ctx.reply('Привіт!');
  }
}
