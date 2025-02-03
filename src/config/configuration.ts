export default () => ({
  app: {
    port: Number(process.env.PORT),
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
  },
});
