import { Theme } from '@react-navigation/native';

export type AppTheme = Theme & {
  colors: Theme['colors'] & {
    secondary: string;
  };
};
