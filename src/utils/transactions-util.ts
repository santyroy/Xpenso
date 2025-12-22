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

export const getExpenseBarChatData = (transactions: Transaction[]) => {
  return transactions
    .flatMap(tx => {
      const isExpense = tx.type === 'expense';
      return isExpense
        ? {
            label: tx.date.getDate().toString(),
            value: tx.amount,
          }
        : [];
    })
    .reverse();
};

type PieData = {
  label: string;
  value: number;
  color: string;
  text: string;
};

type ExpenseDataResponse = {
  totalExpense: number;
  data: PieData[];
};

export const getExpensePieChatData = (
  transactions: Transaction[],
): ExpenseDataResponse => {
  let totalExpense = 0;
  const categoryMap = new Map<string, PieData>();

  // Expenses group by category
  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      totalExpense += tx.amount;
      const { name, color } = tx.category;
      if (categoryMap.has(name)) {
        const existing = categoryMap.get(name);
        if (existing) {
          existing.value += tx.amount;
        }
      } else {
        categoryMap.set(name, {
          label: name,
          value: tx.amount,
          color: color,
          text: '',
        });
      }
    }
  });

  // Calculate expense percent in each category

  const data: PieData[] = Array.from(categoryMap.values(), item => {
    const percentage =
      totalExpense > 0 ? ((item.value / totalExpense) * 100).toFixed(0) : '0';

    return {
      ...item,
      text: `${percentage}%`,
    };
  });

  return { totalExpense, data };
};
