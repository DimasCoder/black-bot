type Env = {
  port: number;
  botToken: string;
};

export const env: Env = {
  port: Number(process.env.PORT),
  botToken: process.env.BOT_TOKEN as string,
};
