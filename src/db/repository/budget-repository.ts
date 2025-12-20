import { Q } from '@nozbe/watermelondb';
import { Budget } from '../../types/budget-types';
import { database } from '../index.native';
import BudgetModel from '../models/BudgetModel';
import { transactionsCollection } from './transaction-repository';

export const budgetsCollection = database.get<BudgetModel>('budgets');

// Add Budget
export async function addBudget(formData: Budget) {
  try {
    const newBudget = await database.write(async () => {
      const row = await budgetsCollection.create(budget => {
        budget.type = formData.type;
        budget.amountLimit = formData.amountLimit;
        budget.category = formData.category.name;
        budget.startDate = formData.startDate;
        budget.endDate = formData.endDate;
        budget.spending = 0;
      });
      return row;
    });
    return newBudget;
  } catch (error) {
    console.log('Add Budget Error: ', error);
    throw error;
  }
}

// Get All Budgets
export async function getAllBudgets() {
  try {
    return await budgetsCollection.query().fetch();
  } catch (error) {
    console.log('Get All Budgets Error: ', error);
    throw error;
  }
}

// Create Budget and Calculate based on existing transactions
export async function createBudgetAndCalculateExistingSpending(
  formData: Budget,
) {
  try {
    return await database.write(async () => {
      // 1. Fetch all existing transactions that fall into this new budget
      const transactions = await transactionsCollection
        .query(
          Q.where('category', formData.category.name),
          Q.where(
            'date',
            Q.between(formData.startDate.getTime(), formData.endDate.getTime()),
          ),
        )
        .fetch();

      // 2. Sum them up
      const totalSpending = transactions.reduce(
        (sum, tx) => sum + tx.amount,
        0,
      );

      // 3. Create the budget with the correct initial spending
      const newBudget = await budgetsCollection.create(budget => {
        budget.type = formData.type;
        budget.amountLimit = formData.amountLimit;
        budget.category = formData.category.name;
        budget.startDate = formData.startDate;
        budget.endDate = formData.endDate;
        budget.spending = totalSpending;
      });

      return newBudget;
    });
  } catch (error) {
    console.log(
      'Create Budget and Calculate existing transactions Error: ',
      error,
    );
    throw error;
  }
}
