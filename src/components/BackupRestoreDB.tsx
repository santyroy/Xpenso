import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Button from './Button';
import { useAppTheme } from '../hooks/useAppTheme';
import { backupData, restoreBackupData } from '../utils/db-utils';
import { persistBackupData } from '../utils/file-utils';
import { useState } from 'react';
import Loading from './Loading';

export function BackupRestoreDB() {
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useAppTheme();

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      const jsonString = await backupData();
      if (jsonString) {
        const fileName = await persistBackupData(jsonString);
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            `Backup saved in Downloads/${fileName}`,
            ToastAndroid.LONG,
          );
        } else {
          Alert.alert(
            'Backup Successful',
            `Available in Files app > On My iPhone > Xpenso`,
          );
        }
      }
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Error During Backup', ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = () => {
    Alert.alert(
      'Restore & Merge Data?',
      'This will add any missing records from your backup and update existing ones. Your current data will not be deleted, but existing records may be overwritten by the backup versions.',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'MERGE',
          onPress: () => {
            (async () => {
              await restoreData();
            })();
          },
        },
      ],
    );
  };

  const restoreData = async () => {
    setIsLoading(true);
    try {
      const isRestoreComplete = await restoreBackupData();
      if (isRestoreComplete) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Data Restore Successful', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Error During Restore', ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.userInfoCard, { backgroundColor: colors.card }]}>
      <Text style={[styles.userInfoText, { color: colors.text }]}>
        Backup & Restore Data
      </Text>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.btnContainer}>
          <Button text="Backup" onPress={handleBackup} style={styles.btn} />
          <Button
            text="Restore"
            onPress={handleRestore}
            style={styles.btn}
            variant="outline"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoCard: { borderRadius: 14, padding: 20, gap: 20 },
  userInfoText: { fontSize: 18, fontWeight: 600, textAlign: 'center' },
  btnContainer: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1 },
});
