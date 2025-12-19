import { Budget } from '../../types/budget-types';
import { database } from '../index.native';
import BudgetModel from '../models/Budget';

const budgetsCollection = database.get('budgets');

// Add Budget
export async function addBudget(formData: Budget) {
  const newBudget = await database.write(async () => {
    const row = await budgetsCollection.create(budget => {
      const mutable = budget as BudgetModel;
      mutable.type = formData.type;
      mutable.amountLimit = formData.amountLimit;
      mutable.category = formData.category.name;
      mutable.startDate = formData.startDate;
      mutable.endDate = formData.endDate;
    });
    return row;
  });
  return newBudget;
}

// Get All Budgets
export async function getAllBudgets() {
  return await budgetsCollection.query().fetch();
}
