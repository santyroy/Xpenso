import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'category', type: 'string' },
        { name: 'date', type: 'number' },
        { name: 'note', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'budgets',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'amountLimit', type: 'number' },
        { name: 'category', type: 'string' },
        { name: 'startDate', type: 'number' },
        { name: 'endDate', type: 'number' },
        { name: 'spending', type: 'number' },
      ],
    }),
  ],
});
