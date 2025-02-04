export class TelegramUtils {
  isValidAge(input: string): boolean {
    return /^\d{1,3}$/.test(input) && Number(input) > 0 && Number(input) < 120;
  }
}
