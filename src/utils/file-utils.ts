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
