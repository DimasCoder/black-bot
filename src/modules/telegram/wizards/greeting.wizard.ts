import { Optional } from '@common/types';
import { WizardContext } from '@modules/telegram/telegram.interface';
import { Markups } from '@modules/telegram/telegram.markups';
import { BOT_MESSAGES } from '@modules/telegram/telegram.messages';
import { TelegramUtils } from '@modules/telegram/telegram.utils';
import { User } from '@modules/user/entities';
import { UserService } from '@modules/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { Action, Ctx, Message, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup } from 'telegraf';

@Wizard('greeting')
@Injectable()
export class GreetingWizard {
  private readonly logger: Logger;

  constructor(
    private readonly userService: UserService,
    private readonly tgUtils: TelegramUtils,
  ) {
    this.logger = new Logger('GreetingWizard', { timestamp: true });
  }

  @WizardStep(1)
  async askName(
    @Ctx()
    ctx: WizardContext,
  ) {
    const menuMarkup = Markup.inlineKeyboard(
      Markups.GREETING_WIZARD.map((markup) =>
        Markup[markup.type].callback(markup.name, markup.action),
      ),
      { columns: 1 },
    );
    await ctx.reply(BOT_MESSAGES.GREETING.NEW_USER_GREETING, menuMarkup);
    this.logger.log(`[Step 1] User: @${ctx.message?.from.username}`);
    ctx.wizard.next();
  }

  @WizardStep(2)
  async endGreeting(
    @Ctx() ctx: WizardContext<User>,
    @Message('text') message: Optional<string>,
  ) {
    this.logger.log(`[Step 2] User: @${ctx.message?.from.username}`);

    const user = ctx.from;

    if (!user) {
      await ctx.reply(BOT_MESSAGES.ERRORS.GENERAL);
      await ctx.scene.leave();
      return;
    }

    if (message && this.tgUtils.isValidName(message)) {
      const { first_name, last_name, username, id } = user;
      await this.userService.create({
        firstName: first_name,
        lastName: last_name,
        chatId: id,
        preferredName: message,
        username,
      });

      await ctx.reply(BOT_MESSAGES.GREETING.SUCCESS_GREETING(message));
      await ctx.scene.leave();
      return;
    }

    await ctx.reply(BOT_MESSAGES.GREETING.REPEAT_NAME_STEP);
  }

  @Action('profile_name')
  async useProfileName(@Ctx() ctx: WizardContext) {
    this.logger.log("[Action 'skip_name']");

    const user = ctx.from;

    if (!user) {
      await ctx.reply(BOT_MESSAGES.ERRORS.GENERAL);
      await ctx.scene.leave();
      return;
    }

    const { first_name, last_name, username, id } = user;

    await this.userService.create({
      firstName: first_name,
      lastName: last_name,
      chatId: id,
      username,
    });

    await ctx.reply(BOT_MESSAGES.GREETING.SUCCESS_GREETING(first_name));
    await ctx.scene.leave();
    return;
  }
}
