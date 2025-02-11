import { User } from '@modules/user/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramUtils {
  isValidAge = (input: string): boolean =>
    /^\d{1,3}$/.test(input) && Number(input) > 0 && Number(input) < 120;

  isValidName = (name: string): boolean =>
    /^[\p{L}\p{N}\p{Emoji}]+(?:[-' ][\p{L}\p{N}\p{Emoji}]+)*$/u.test(
      name.trim(),
    );

  getUserDisplayName = (user: User): string =>
    user.preferredName || user.firstName;
}
