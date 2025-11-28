import { Category } from '../types/transactions-types';

export const expenseCategories: Category[] = [
  { id: 1, name: 'bill', iconName: 'money-bills' },
  { id: 2, name: 'media', iconName: 'film' },
  { id: 3, name: 'health', iconName: 'suitcase-medical' },
  { id: 4, name: 'house', iconName: 'house-user' },
  { id: 5, name: 'transport', iconName: 'car' },
  { id: 6, name: 'grocery', iconName: 'shop' },
  { id: 7, name: 'shopping', iconName: 'cart-shopping' },
  { id: 8, name: 'others', iconName: 'credit-card' },
];

export const incomeCategories: Category[] = [
  { id: 1, name: 'salary', iconName: 'money-bill-trend-up' },
  { id: 2, name: 'business', iconName: 'business-time' },
  { id: 3, name: 'freelance', iconName: 'house-laptop' },
  { id: 4, name: 'others', iconName: 'credit-card' },
];
