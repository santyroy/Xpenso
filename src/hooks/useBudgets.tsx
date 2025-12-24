import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { budgetsCollection } from '../db/repository/budget-repository';
import BudgetModel from '../db/models/BudgetModel';
import { extractCategory } from '../utils/categories';
import { Budget, BudgetType } from '../types/budget-types';

const reducer = (acc: Budget[], curr: BudgetModel) => {
  const { id, type, amountLimit, category, startDate, endDate, spending } =
    curr;
  const budgetType = type as BudgetType;
  const categoryObj = extractCategory(budgetType, category);
  if (categoryObj) {
    acc.push({
      id,
      amountLimit,
      category: categoryObj,
      startDate,
      endDate,
      type: budgetType,
      spending,
    });
  }

  return acc;
};

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    setError('');
    const subscription = budgetsCollection
      .query()
      .observe()
      .subscribe({
        next: rows => {
          const data = rows.reduce(reducer, [] as Budget[]);
          setBudgets(data);
          setIsLoading(false);
        },
        error: err => {
          const errMessage = err instanceof Error ? err.message : String(err);
          setError(errMessage);
          setIsLoading(false);
        },
      });

    return () => subscription.unsubscribe();
  }, [isFocused]);

  return { budgets, isLoading, error };
};
