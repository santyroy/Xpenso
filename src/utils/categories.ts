import { Category, TransactionType } from '../types/transactions-types';

export const expenseCategories: Category[] = [
  { id: 1, name: 'bill', iconName: 'money-bills', color: '#FFB84C' },
  { id: 2, name: 'media', iconName: 'film', color: '#A06CD5' },
  { id: 3, name: 'health', iconName: 'suitcase-medical', color: '#00FFFF' },
  { id: 4, name: 'house', iconName: 'house-user', color: '#D4F99F' },
  { id: 5, name: 'transport', iconName: 'car', color: '#57B6FF' },
  { id: 6, name: 'grocery', iconName: 'shop', color: '#FF7F50' },
  { id: 7, name: 'shopping', iconName: 'cart-shopping', color: '#FF477F' },
  { id: 8, name: 'others', iconName: 'credit-card', color: '#9DD9D2' },
];

export const incomeCategories: Category[] = [
  { id: 1, name: 'salary', iconName: 'money-bill-trend-up', color: '#00C853' },
  { id: 2, name: 'business', iconName: 'business-time', color: '#00C853' },
  { id: 3, name: 'freelance', iconName: 'house-laptop', color: '#00C853' },
  { id: 4, name: 'others', iconName: 'credit-card', color: '#00C853' },
];

export const extractCategory = (type: TransactionType, name: string) => {
  const data = type === 'expense' ? expenseCategories : incomeCategories;
  return data.find(item => item.name === name);
};
