import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  getTransactionsSubcriptionByDateRange,
  getTransactionsSubcriptionByLimit,
} from '../db/repository/transaction-repository';
import TransactionModel from '../db/models/TransactionModel';
import { extractCategory } from '../utils/categories';
import { Transaction, TransactionType } from '../types/transaction-types';

const reducer = (acc: Transaction[], curr: TransactionModel): Transaction[] => {
  const { id, type, amount, category, date, note } = curr;
  const transactionType = type as TransactionType;
  const categoryObj = extractCategory(transactionType, category);
  if (categoryObj) {
    acc.push({
      id,
      type: transactionType,
      amount,
      category: categoryObj,
      date,
      note,
    });
  }
  return acc;
};

type Props = {
  limit?: number;
  month?: number;
  year?: number;
};

export const useTransactions = ({
  limit = 10,
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
}: Props = {}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setError('');

      const observable =
        limit && limit > 0
          ? getTransactionsSubcriptionByLimit(limit)
          : getTransactionsSubcriptionByDateRange(
              new Date(year, month, 1),
              new Date(year, month + 1, 0),
            );

      const subscription = observable.subscribe({
        next: rows => {
          const data = rows.reduce(reducer, [] as Transaction[]);
          setTransactions(data);
          setIsLoading(false); // Data arrived!
        },
        error: err => {
          const errorMessage = err instanceof Error ? err.message : String(err);
          setError('Error: ' + errorMessage);
          setIsLoading(false);
        },
      });

      return () => subscription.unsubscribe();
    }, [limit, month, year]),
  );

  return { transactions, isLoading, error };
};
