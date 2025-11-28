import { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';

export type TransactionType = 'income' | 'expense';

export type Category = {
  id: number;
  name: string;
  iconName: FontAwesome6SolidIconName;
};
