import { FormError } from '../types/errors-types';
import { TransactionForm } from '../types/transactions-types';

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

type setErrors = (err: FormError) => void;

export const validateForm = (
  formData: TransactionForm,
  setErrors: setErrors,
) => {
  let err: FormError = {};
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
