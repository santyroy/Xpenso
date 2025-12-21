import { useEffect, useState } from 'react';
import { getTransactionsSubcriptionByLimit } from '../db/repository/transaction-repository';
import { Transaction } from '../types/transaction-types';
import { getYearlyIncome } from '../utils/transactions-util';

export const useIncomeAnalytics = () => {
  const [income, setIncome] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    const subscription = getTransactionsSubcriptionByLimit(1000).subscribe({
      next: data => {
        const incomes = getYearlyIncome(data);
        setIncome(incomes);
        setIsLoading(false);
      },
      error: err => {
        const errMessage = err instanceof Error ? err.message : String(err);
        setError(errMessage);
        setIsLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return { income, isLoading, error };
};
