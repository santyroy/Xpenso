import { useEffect, useState } from 'react';
import { Model } from '@nozbe/watermelondb';
import {
  getAllTransactions,
  getTransactionsByLimit,
} from '../db/repository/transaction-repository';
import TransactionModel from '../db/models/Transaction';
import { extractCategory } from '../utils/categories';
import { Transaction, TransactionType } from '../types/transactions-types';

const reducer = (acc: Transaction[], t: Model): Transaction[] => {
  const { id, type, amount, category, date, note } = t as TransactionModel;
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

export const useTransactions = (limit?: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError('');

      try {
        let rows;
        if (limit && limit > 0) {
          rows = await getTransactionsByLimit(limit);
        } else {
          rows = await getAllTransactions();
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
  }, [limit]);

  return { transactions, isLoading, error };
};
