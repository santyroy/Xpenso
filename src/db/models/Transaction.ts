import { Model } from '@nozbe/watermelondb';
import { field, text, date } from '@nozbe/watermelondb/decorators';

export default class Transaction extends Model {
  static table = 'transactions';

  @text('type') type!: string;
  @field('amount') amount!: number;
  @text('category') category!: string;
  @date('date') date!: Date;
  @text('note') note!: string;
}
