import { Injectable } from '@nestjs/common';
import { Ctx, On, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class TelegramService {
  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    const message = ctx.text;
    console.log(`Received message: ${message}`);

    await ctx.reply('Привіт!');
  }
}
