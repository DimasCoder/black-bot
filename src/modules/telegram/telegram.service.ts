import { Injectable } from '@nestjs/common';
import { Command, Ctx, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class TelegramService {
  @Command('start')
  async onStartCommand(@Ctx() ctx: Context) {
    await ctx.reply('Привіт, мене звати Black Bot.');
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

    console.log(`Received message: ${message}`);

    await ctx.reply('Привіт!');
  }
}
