import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'category', type: 'string', isIndexed: true },
        { name: 'date', type: 'number', isIndexed: true },
        { name: 'note', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'budgets',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'amountLimit', type: 'number' },
        { name: 'category', type: 'string', isIndexed: true },
        { name: 'startDate', type: 'number', isIndexed: true },
        { name: 'endDate', type: 'number', isIndexed: true },
        { name: 'spending', type: 'number' },
      ],
    }),
  ],
});
