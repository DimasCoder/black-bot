import { WizardContext } from '@modules/telegram/telegram.interface';
import { BOT_MESSAGES } from '@modules/telegram/telegram.messages';
import { TelegramUtils } from '@modules/telegram/telegram.utils';
import { Injectable } from '@nestjs/common';
import { Ctx, Wizard, WizardStep } from 'nestjs-telegraf';

@Wizard('register')
@Injectable()
export class RegisterWizard {
  private readonly telegramUtils: TelegramUtils;

  constructor() {
    this.telegramUtils = new TelegramUtils();
  }

  @WizardStep(1)
  async askName(
    @Ctx()
    ctx: WizardContext,
  ) {
    await ctx.reply(BOT_MESSAGES.REGISTRATION.ENTER_NAME_STEP);
    ctx.wizard.next();
  }

  @WizardStep(2)
  async askAge(@Ctx() ctx: WizardContext<{ name: string; age: number }>) {
    if (ctx.message && 'text' in ctx.message) {
      ctx.scene.session.state.name = ctx.message.text;
      await ctx.reply(
        BOT_MESSAGES.REGISTRATION.ENTER_AGE_STEP + ctx.message.text + '?',
      );
      ctx.wizard.next();
    } else {
      await ctx.reply(BOT_MESSAGES.REGISTRATION.REPEAT_NAME_STEP);
    }
  }

  @WizardStep(3)
  async showSummary(@Ctx() ctx: WizardContext<{ name: string; age: number }>) {
    if (
      ctx.message &&
      'text' in ctx.message &&
      this.telegramUtils.isValidAge(ctx.message.text)
    ) {
      ctx.scene.session.state.age = Number(ctx.message.text);
      const { name, age } = ctx.scene.session.state;
      await ctx.reply(`Дякую, ${name}! Тобі ${age} років.`);
      await ctx.scene.leave();
    } else {
      await ctx.reply(BOT_MESSAGES.REGISTRATION.REPEAT_AGE_STEP);
    }
  }
}
