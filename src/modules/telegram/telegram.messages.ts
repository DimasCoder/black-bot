const greetingMessages = [
  'О, як приємно чути тебе, {name}! Радію твоєму поверненню!',
  'Салют, {name}! Твоя поява робить цей день особливим!',
  'Привіт, {name}! Дуже радий тебе знову бачити!',
  'Хей, {name}! Ти – наше сонечко в цьому чаті!',
  'Вітаю, {name}! Дуже приємно, що ти знову тут!',
  'О, {name}! Твоє повернення приносить гарний настрій!',
  'Привіт-привіт, {name}! Радію твоїй присутності!',
  'Радий бачити тебе, {name}! Вітаю!',
  'Доброго дня, {name}! Твій прихід надихає!',
  'Хей-хей, {name}! Радію, що ти з нами!',
  'Привіт, друже {name}! Круто, що ти повернувся!',
  'Вітаю, {name}! Ти просто неперевершений(а)!',
  'О, {name}! Щиро вітаю тебе знову!',
  'Привіт, {name}! Дуже класно, що ти тут!',
  'Здоров, {name}! Твоя поява робить день яскравішим!',
  'Привіт, {name}! Радий чути тебе знову!',
  'Салют, {name}! Дуже приємно знову чути тебе!',
  'О, {name}! Твоя присутність завжди дарує позитив!',
  'Привіт, {name}! Радий зустріти тебе знову!',
  'Вітаю, {name}! Ти повернувся – це чудово!',
];

const greetingActionQuestions = [
  'Що будемо робити далі?',
  'Який наш наступний крок?',
  'Чим займемось зараз?',
  'Як розпочнемо сьогодні?',
  'Що плануєш робити далі?',
  'На що наважимось сьогодні?',
  'Які у тебе ідеї для наступного кроку?',
  'Чим займемось на цей раз?',
  'Давай вирішимо, що робити далі!',
  'Як думаєш, що варто робити зараз?',
  'Твоє бачення: що робити далі?',
  'Що ж, який наш наступний рух?',
  'Давай оберемо наступний крок – що пропонуєш?',
  'Який план на зараз?',
  'На що зосередимся у наступну чергу?',
  'Яке твоє бачення наступних дій?',
  'Що буде нашим наступним кроком?',
  'Як думаєш, що варто робити далі?',
  'Розкажи, що плануєш робити далі?',
  'Готовий(а) діяти – який наш наступний план?',
];

const generateGreetingMessage = (name: string): string => {
  const randomGreetingIndex = Math.floor(
    Math.random() * greetingMessages.length,
  );
  const randomQuestionIndex = Math.floor(
    Math.random() * greetingActionQuestions.length,
  );
  return `${greetingMessages[randomGreetingIndex].replace(/\{name\}/g, name)} ${greetingActionQuestions[randomQuestionIndex]}`;
};

export const BOT_MESSAGES = {
  GREETING: {
    EXISTING_USER_GREETING: (name: string) => generateGreetingMessage(name),
    NEW_USER_GREETING:
      'Вітаю. Давай знайомитись. Мене звати Black Bot. Як мені звертатися до тебе?',
    REPEAT_NAME_STEP: "Введи корректне ім'я.",
    SUCCESS_GREETING: (name: string) => `Приємно познайомитись, ${name}.`,
  },
  ERRORS: {
    GENERAL:
      'Упс, щось пішло не так при завантаженні даних. Будь ласка, спробуй ще раз.',
  },
};
