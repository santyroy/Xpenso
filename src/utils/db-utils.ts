import { Model, RawRecord } from '@nozbe/watermelondb';
import { database } from '../db/index.native';
import { Dirs, FileSystem } from 'react-native-file-access';
import { pick } from '@react-native-documents/picker';

export const backupData = async () => {
  const tableNames = ['transactions', 'budgets'];
  const result: Record<string, RawRecord[]> = {};
  try {
    // Fetch rows from tables parallely
    const exportData = await Promise.all(
      tableNames.map(async table => {
        const records = await database.get(table).query().fetch();
        return { table, data: records.map(r => r._raw) }; // _raw preserves IDs and metadata
      }),
    );

    // Populate results object
    exportData.forEach(({ table, data }) => {
      result[table] = data;
    });

    // Convert Result object to JSON string
    const jsonString = JSON.stringify(result);
    return jsonString;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
};

export const restoreBackupData = async () => {
  try {
    // Pick the backup file
    const [result] = await pick({ mode: 'open', type: 'application/json' });

    // Read and parse the file content
    const fileContent = await FileSystem.readFile(result.uri, 'utf8');
    const backupJSON = JSON.parse(fileContent);

    // Perform write operation
    await database.write(async () => {
      const allOperations: Model[] = [];

      // Iterate each table
      for (const table of Object.keys(backupJSON)) {
        try {
          const collection = database.get(table);
          const recordsToInsert = backupJSON[table] as any[];

          for (const rawData of recordsToInsert) {
            // Check if this specific record already exists in the local DB
            const existingRecord = await collection
              .find(rawData.id)
              .catch(() => null);

            if (existingRecord) {
              // If it exists, we UPDATE it with the backup data
              const operation = existingRecord.prepareUpdate(record =>
                Object.assign(record._raw, rawData),
              );
              allOperations.push(operation);
            } else {
              const operation = collection.prepareCreate(record =>
                Object.assign(record._raw, rawData),
              );
              allOperations.push(operation);
            }
          }
        } catch (error) {
          console.warn(
            `Skipping table ${table} as it does not exist in the current schema.`,
          );
          continue;
        }
      }

      if (allOperations.length > 0) {
        await database.batch(allOperations);
      }
    });

    console.log('Restore successful');
    return true;
  } catch (error) {
    console.log('Restore failed: ', error);
    throw error;
  }
};
