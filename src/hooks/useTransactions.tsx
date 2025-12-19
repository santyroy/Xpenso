import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  getTransactionsByDateRange,
  getTransactionsByLimit,
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
};

export const useTransactions = ({
  limit = 10,
  month = new Date().getMonth(),
}: Props = {}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        setIsLoading(true);
        setError('');

        try {
          let rows;
          if (limit && limit > 0) {
            rows = await getTransactionsByLimit(limit);
          } else {
            const currentDate = new Date();
            const startDate = new Date(currentDate.getFullYear(), month, 1);
            const endDate = new Date(currentDate.getFullYear(), month + 1, 0);
            rows = await getTransactionsByDateRange(startDate, endDate);
          }
          const data = rows.reduce(reducer, [] as Transaction[]);
          setTransactions(data);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          setError('Error: ' + errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTransactions();
    }, [limit, month]),
  );

  return { transactions, isLoading, error };
};
