import { Platform } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import { storage } from '../mmkv/storage';
import { STORAGE_KEYS } from '../mmkv/keys';

export const DEFAULT_AVATAR = require('../../assets/images/user-avatar.webp');

export const persistProfileImage = async (tempUri: string) => {
  try {
    // 1. Clean the URI
    // Picker sometimes returns 'file://' prefix which some FS methods dislike
    const sourcePath = tempUri.replace('file://', '');

    // 2. Define the permanent home
    const fileName = `profile_pic_${Date.now()}.jpg`;
    const destPath = `${Dirs.DocumentDir}/${fileName}`;

    // 3. Check if old image exist, if yes unlink to delete old file
    const oldFileName = storage.getString(STORAGE_KEYS.USER_PROFILE_PIC);
    if (oldFileName) {
      const oldPath = `${Dirs.DocumentDir}/${oldFileName}`;
      // Check if it exists before trying to delete
      const exists = await FileSystem.exists(oldPath);
      if (exists) {
        await FileSystem.unlink(oldPath);
      }
    }

    // 4. Move the file
    // 'cp' (copy) is safer than 'mv' (move) to avoid issues with temp files
    await FileSystem.cp(sourcePath, destPath);

    return fileName;
  } catch (error) {
    console.error('Local-first storage failed:', error);
    throw error;
  }
};

export const persistBackupData = async (jsonString: string) => {
  // Generate formatted filename
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const date = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const mins = String(currentDate.getMinutes()).padStart(2, '0');
  const secs = String(currentDate.getSeconds()).padStart(2, '0');
  const fileName = `xpenso_backup_${year}${month}${date}_${hours}${mins}${secs}.json`;

  try {
    if (Platform.OS === 'ios') {
      // iOS: Save directly to DocumentDir (Visible in Files app via Info.plist)
      const path = `${Dirs.DocumentDir}/${fileName}`;
      await FileSystem.writeFile(path, jsonString, 'utf8');
      console.log('iOS Backup saved to Documents:', path);
    } else {
      // Android: Save to Cache first, then copy to Public Downloads
      const tempPath = `${Dirs.CacheDir}/${fileName}`;
      await FileSystem.writeFile(tempPath, jsonString, 'utf8');

      const publicPath = await FileSystem.cpExternal(
        tempPath,
        fileName,
        'downloads',
      );
      console.log('Android Backup exported to Downloads:', publicPath);

      // Clean up the temp file from cache
      await FileSystem.unlink(tempPath);
    }
    return fileName;
  } catch (error) {
    console.error('Export failed:', error);
    throw error; // Re-throw so the UI can catch it and show an error toast
  }
};
