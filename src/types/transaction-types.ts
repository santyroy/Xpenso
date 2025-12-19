import { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';

export type TransactionType = 'income' | 'expense';

export type Category = {
  id: number;
  name: string;
  iconName: FontAwesome6SolidIconName;
  color: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: Date;
  note?: string;
};

export type TransactionForm = {
  type: TransactionType;
  amount: string;
  category: Category | undefined;
  date: string;
  note?: string;
};

// Used for API, Storage, and NAVIGATION PARAMS
export type SerializableTransaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string; // ISO date string
  note?: string;
};
