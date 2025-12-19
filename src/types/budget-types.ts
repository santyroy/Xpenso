import { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';

export type BudgetType = 'expense';

export type Category = {
  id: number;
  name: string;
  iconName: FontAwesome6SolidIconName;
  color: string;
};

export type Budget = {
  id: string;
  type: BudgetType;
  amountLimit: number;
  category: Category;
  startDate: Date;
  endDate: Date;
  spending: number;
};

export type BudgetFormData = {
  type: BudgetType;
  amountLimit: string;
  category: Category | undefined;
  startDate: string;
  period: Period;
};

// Used for API, Storage, and NAVIGATION PARAMS
export type SerializableBudget = {
  id: string;
  type: BudgetType;
  amount: string;
  category: Category;
  startDate: string; // ISO date string
  period: Period;
  spending: number;
};

export type Period = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
