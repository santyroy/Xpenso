import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAllBudgets } from '../db/repository/budget-repository';
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

  useFocusEffect(
    useCallback(() => {
      const fetchBudgets = async () => {
        setIsLoading(true);
        setError('');

        try {
          const rows = await getAllBudgets();
          const data = rows.reduce(reducer, [] as Budget[]);
          setBudgets(data);
        } catch (err) {
          const errMessage = err instanceof Error ? err.message : String(err);
          setError(errMessage);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBudgets();
    }, []),
  );

  return { budgets, isLoading, error };
};
