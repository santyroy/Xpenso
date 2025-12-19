import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migrations';
import Transaction from './models/Transaction';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'xpenso',
  jsi: true,
  onSetUpError: error => {
    console.error('DB onSetUpError: ', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Transaction],
});
