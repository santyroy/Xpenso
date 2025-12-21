import TransactionModel from '../db/models/TransactionModel';
import { Transaction } from '../types/transaction-types';
import { extractCategory } from './categories';
import { months } from './text-utils';

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

const currentYear = new Date().getFullYear();

export const getYearlyIncome = (txModel: TransactionModel[]): Transaction[] => {
  return txModel.flatMap(model => {
    const isIncome = model.type === 'income';
    const isCorrectYear = new Date(model.date).getFullYear() === currentYear;
    const categoryObj = extractCategory('income', model.category);

    if (isIncome && isCorrectYear && categoryObj) {
      return {
        id: model.id,
        amount: model.amount,
        type: 'income',
        category: categoryObj,
        date: model.date,
        note: model.note,
      };
    }

    return [];
  });
};

export const getTransactionsGroupByMonth = (transactions: Transaction[]) => {
  const report = months.map(month => ({
    label: month.substring(0, 3),
    value: 0,
  }));
  transactions.forEach(tx => {
    const monthIndex = tx.date.getMonth(); // 0=Jan, 1=Feb, 2=Mar,...,11=Dec
    report[monthIndex].value += tx.amount;
  });
  return report;
};
