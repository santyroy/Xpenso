import { Transaction } from '../types/transaction-types';

export const getTransactionSummary = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
      }
      if (curr.type === 'expense') {
        acc.expense += curr.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );
};
