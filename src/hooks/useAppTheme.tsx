import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../types/theme-types';

export const useAppTheme = () => {
  return useTheme() as AppTheme;
};
