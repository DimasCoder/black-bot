export class TelegramUtils {
  isValidAge(input: string): boolean {
    return /^\d{1,3}$/.test(input) && Number(input) > 0 && Number(input) < 120;
  }

  isValidName(name: string): boolean {
    return /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+(?:[-' ][A-Za-zА-Яа-яІіЇїЄєҐґ]+)*$/.test(
      name.trim(),
    );
  }
}
