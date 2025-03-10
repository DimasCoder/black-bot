export default () => ({
  app: {
    port: Number(process.env.PORT),
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
