import { WizardContext } from '@modules/telegram/telegram.interface';
import { BOT_MESSAGES } from '@modules/telegram/telegram.messages';
import { TelegramUtils } from '@modules/telegram/telegram.utils';
import { UserService } from '@modules/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Wizard, WizardStep } from 'nestjs-telegraf';

@Wizard('register')
@Injectable()
export class RegisterWizard {
  private readonly telegramUtils: TelegramUtils;
  private readonly logger: Logger;

  constructor(private readonly userService: UserService) {
    this.telegramUtils = new TelegramUtils();
    this.logger = new Logger('RegisterWizard', { timestamp: true });
  }

  @WizardStep(1)
  async askName(
    @Ctx()
    ctx: WizardContext,
  ) {
    await ctx.reply(BOT_MESSAGES.REGISTRATION.ENTER_NAME_STEP);
    this.logger.log(`[Step 1] User: @${ctx.message?.from.username}`);
    ctx.wizard.next();
  }

  @WizardStep(2)
  async askAge(@Ctx() ctx: WizardContext<{ name: string; age: number }>) {
    this.logger.log(`[Step 2] User: @${ctx.message?.from.username}`);

    if (
      ctx.message &&
      'text' in ctx.message &&
      this.telegramUtils.isValidName(ctx.message.text)
    ) {
      ctx.scene.session.state.name = ctx.message.text;
      await ctx.reply(
        BOT_MESSAGES.REGISTRATION.ENTER_AGE_STEP + ctx.message.text + '?',
      );
      ctx.wizard.next();
      return;
    }

    await ctx.reply(BOT_MESSAGES.REGISTRATION.REPEAT_NAME_STEP);
  }

  @WizardStep(3)
  async showSummary(@Ctx() ctx: WizardContext<{ name: string; age: number }>) {
    this.logger.log(`[Step 3] User: @${ctx.message?.from.username}`);

    if (
      ctx.message &&
      'text' in ctx.message &&
      this.telegramUtils.isValidAge(ctx.message.text)
    ) {
      ctx.scene.session.state.age = Number(ctx.message.text);
      const { name, age } = ctx.scene.session.state;
      await ctx.reply(`Дякую, ${name}! Тобі ${age} років.`);
      await ctx.scene.leave();
      return;
    }

    await ctx.reply(BOT_MESSAGES.REGISTRATION.REPEAT_AGE_STEP);
  }
}
