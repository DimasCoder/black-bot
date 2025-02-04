import {
  Action,
  Command,
  Ctx,
  InjectBot,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { COMMANDS } from '@modules/telegram/telegram.commands';
import { BOT_MESSAGES } from '@modules/telegram/telegram.messages';
import { SceneContext } from 'telegraf/scenes';
import { MARKUPS } from '@modules/telegram/telegram.markups';

@Update()
export class TelegramController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Start()
  async onStartCommand(@Ctx() ctx: Context) {
    const menuMarkup = Markup.inlineKeyboard(
      MARKUPS.START_MENU.map((markup) =>
        Markup[markup.type].callback(markup.name, markup.action),
      ),
      { columns: 1 },
    );

    await ctx.reply(BOT_MESSAGES.NEW_USER_GREETING, menuMarkup);
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

  @Command('register')
  @Action('register')
  async startForm(
    @Ctx()
    ctx: SceneContext<Context>,
  ) {
    await ctx.scene.enter('register');
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

    console.log(`Received message: ${message}`);

    await ctx.reply('Привіт!');
  }
}
