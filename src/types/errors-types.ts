export type TransactionFormError = {
  amount?: string;
  category?: string;
  date?: string;
};

export type BudgetFormError = {
  amountLimit?: string;
  category?: string;
  startDate?: string;
  period?: string;
};

export type SignupFormError = {
  name?: string;
};
