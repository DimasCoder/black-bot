enum MarkupNames {
  GREETING_WIZARD = 'GREETING_WIZARD',
}

type Markup = { name: string; action: string; type: 'button' };
type AvailableMarkups = Record<MarkupNames, Array<Markup>>;

export const Markups: AvailableMarkups = {
  GREETING_WIZARD: [
    {
      name: "Використовувати ім'я профілю",
      action: 'profile_name',
      type: 'button',
    },
  ],
};
