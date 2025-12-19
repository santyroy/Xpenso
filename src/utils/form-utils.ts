import { BudgetForm } from '../types/budget-types';
import { BudgetFormError, TransactionFormError } from '../types/errors-types';
import { TransactionForm } from '../types/transaction-types';
import { budgetPeriod } from './text-utils';

export function isValidDate(date: string): boolean {
  const dateArr = date.split('/');
  if (dateArr.length !== 3) return false; // must be DD/MM/YYYY

  const [day, month, year] = dateArr.map(Number);

  // Construct date safely
  const tempDate = new Date(year, month - 1, day);

  // Check that components match (to avoid cases like 32/01/2025 rolling over)
  return (
    tempDate.getFullYear() === year &&
    tempDate.getMonth() === month - 1 &&
    tempDate.getDate() === day
  );
}

export function generateTimestamp(date: string) {
  const selectedDate = new Date(date);
  const now = new Date();
  const finalTimestamp = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  );
  return finalTimestamp;
}

type setErrors = (err: TransactionFormError) => void;

export const validateTransactionForm = (
  formData: TransactionForm,
  setErrors: setErrors,
) => {
  let err: TransactionFormError = {};
  const { amount, category, date } = formData;

  if (amount === '') {
    err.amount = 'Amount is required';
  } else if (isNaN(parseFloat(amount))) {
    err.amount = 'Invalid Amount';
  }
  if (!category) {
    err.category = 'Category is required';
  }
  if (date === '') {
    err.date = 'Date is required';
  } else if (isNaN(Date.parse(date))) {
    err.date = 'Invalid Date';
  }

  setErrors(err);
  return Object.values(err).length === 0;
};

export const validateBudgetForm = (
  formData: BudgetForm,
  setErrors: setErrors,
) => {
  let err: BudgetFormError = {};
  const { amountLimit, category, startDate, period } = formData;

  if (amountLimit === '') {
    err.amountLimit = 'Amount Limit is required';
  } else if (isNaN(parseFloat(amountLimit))) {
    err.amountLimit = 'Invalid Amount';
  }
  if (!category) {
    err.category = 'Category is required';
  }
  if (startDate === '') {
    err.startDate = 'Date is required';
  } else if (isNaN(Date.parse(startDate))) {
    err.startDate = 'Invalid Date';
  }
  if (period === '' || !budgetPeriod.includes(period)) {
    err.period = 'Invalid Period';
  }

  setErrors(err);
  return Object.values(err).length === 0;
};
