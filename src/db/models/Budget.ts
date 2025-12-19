import { Model } from '@nozbe/watermelondb';
import { field, text, date } from '@nozbe/watermelondb/decorators';

export default class Budget extends Model {
  static table = 'budgets';

  @text('type') type!: string;
  @field('amountLimit') amountLimit!: number;
  @text('category') category!: string;
  @date('startDate') startDate!: Date;
  @date('endDate') endDate!: Date;
  @field('spending') spending!: number;
}
