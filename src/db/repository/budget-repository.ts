import { Budget } from '../../types/budget-types';
import { database } from '../index.native';
import BudgetModel from '../models/BudgetModel';

const budgetsCollection = database.get<BudgetModel>('budgets');

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
