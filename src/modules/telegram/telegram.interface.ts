import { Scenes } from 'telegraf';
import { WizardContext as BaseWizardContext } from 'telegraf/scenes';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface WizardContext<T extends object = {}>
  extends BaseWizardContext {
  update: Update.CallbackQueryUpdate;
  session: Scenes.SceneSession<SceneSession<T>>;
  scene: Scenes.SceneContextScene<WizardContext<T>, SceneSession<T>>;
}

interface SceneSession<T extends object> extends Scenes.WizardSessionData {
  state: T;
}
