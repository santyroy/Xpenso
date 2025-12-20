import { Model, Q } from '@nozbe/watermelondb';
import { database } from '../index.native';
import { Transaction } from '../../types/transaction-types';
import TransactionModel from '../models/TransactionModel';
import { budgetsCollection } from './budget-repository';

const transactionsCollection = database.get<TransactionModel>('transactions');

// Add transaction
export async function addTransaction(formData: Transaction) {
  try {
    const newTransaction = await database.write(async () => {
      const row = await transactionsCollection.create(transaction => {
        transaction.type = formData.type;
        transaction.amount = formData.amount;
        transaction.category = formData.category.name;
        transaction.date = formData.date;
        transaction.note = formData.note || '';
      });
      return row;
    });
    return newTransaction;
  } catch (error) {
    console.log('Add Transaction Error: ', error);
    throw error;
  }
}

// Fetch all transactions
export async function getAllTransactions() {
  try {
    return await transactionsCollection.query(Q.sortBy('date', 'desc')).fetch();
  } catch (error) {
    console.log('Get All Transactions Error: ', error);
    throw error;
  }
}

// Fetch limited transactions
export async function getTransactionsByLimit(limit: number) {
  try {
    return await transactionsCollection
      .query(Q.sortBy('date', 'desc'), Q.take(limit))
      .fetch();
  } catch (error) {
    console.log('Get Transactions By Limit Error: ', error);
    throw error;
  }
}

// Fetch transactions by category
export async function getTransactionsByCategory(category: string) {
  try {
    return await transactionsCollection
      .query(Q.where('category', category))
      .fetch();
  } catch (error) {
    console.log('Get Transactions By Category Error: ', error);
    throw error;
  }
}

// Fetch transactions by date range
export async function getTransactionsByDateRange(start: Date, end: Date) {
  try {
    return await transactionsCollection
      .query(
        Q.where('date', Q.between(start.getTime(), end.getTime())),
        Q.sortBy('date', 'desc'),
      )
      .fetch();
  } catch (error) {
    console.log('Get Transactions By DateRange Error: ', error);
    throw error;
  }
}

// Update transaction by id
export async function updateTransactionById(
  id: string,
  updateTransaction: Transaction,
) {
  try {
    const currTransaction = await transactionsCollection.find(id);
    const updatedTransaction = await database.write(async () => {
      const row = await currTransaction.update(transaction => {
        transaction.amount = updateTransaction.amount;
        transaction.category = updateTransaction.category.name;
        transaction.date = updateTransaction.date;
        transaction.note = updateTransaction.note ?? '';
      });
      return row;
    });
    return updatedTransaction;
  } catch (error) {
    console.log('Update Transaction Error: ', error);
    throw error;
  }
}

// Delete transaction by id
export async function deleteTransactionById(id: string) {
  try {
    const transaction = await transactionsCollection.find(id);
    return await database.write(async () => {
      await transaction.destroyPermanently();
    });
  } catch (error) {
    console.log('Delete Transaction Error: ', error);
    throw error;
  }
}

// Create new transaction and update existing budgets
export async function createTransactionAndUpdateBudget(formData: Transaction) {
  return await database.write(async () => {
    try {
      // Find the relevant Budgets
      // Optimization: Only look for budgets where the category matches and
      // the transaction date falls between startDate and endDate
      const budgets = await budgetsCollection
        .query(
          Q.where('category', formData.category.name),
          Q.where('startDate', Q.lte(formData.date.getTime())),
          Q.where('endDate', Q.gte(formData.date.getTime())),
        )
        .fetch();

      // Prepare the operations list
      const operations: Model[] = [];

      // Prepare Transaction creation
      const newTransaction = transactionsCollection.prepareCreate(
        transaction => {
          transaction.type = formData.type;
          transaction.amount = formData.amount;
          transaction.category = formData.category.name;
          transaction.date = formData.date;
          transaction.note = formData.note || '';
        },
      );
      operations.push(newTransaction);

      // Prepare Budgets updates
      if (budgets.length > 0) {
        const budgetUpdates = budgets.map(budget =>
          budget.prepareUpdate(b => {
            b.spending += formData.amount;
          }),
        );
        operations.push(...budgetUpdates);
      }

      // Execute everything in one single atomic batch
      // We include the newTransaction and spread the budgetUpdates array
      await database.batch(...operations);

      return newTransaction;
    } catch (error) {
      console.log('Create Transaction and Update Budget Error: ', error);
      throw error;
    }
  });
}

// Update transaction and update budgets
export async function updateTransactionByIdAndUpdateBudget(
  id: string,
  formData: Transaction,
) {
  // find existing transaction
  const existingTx = await transactionsCollection.find(id);
  if (!existingTx) return;

  return await database.write(async () => {
    try {
      // Prepare the operations list
      const operations: Model[] = [];

      // --- STEP 1: REVERT OLD IMPACT ---
      const oldBudgets = await budgetsCollection
        .query(
          Q.where('category', existingTx.category),
          Q.where('startDate', Q.lte(existingTx.date.getTime())),
          Q.where('endDate', Q.gte(existingTx.date.getTime())),
        )
        .fetch();

      operations.push(
        ...oldBudgets.map(budget =>
          budget.prepareUpdate(b => {
            b.spending -= existingTx.amount;
          }),
        ),
      );

      // --- STEP 2: APPLY NEW IMPACT ---
      // We query again. Even if it's the same budget, fetch() returns a
      // NEW object instance, which makes WatermelonDB happy.
      const newBudgets = await budgetsCollection
        .query(
          Q.where('category', formData.category.name),
          Q.where('startDate', Q.lte(formData.date.getTime())),
          Q.where('endDate', Q.gte(formData.date.getTime())),
        )
        .fetch();

      operations.push(
        ...newBudgets.map(budget =>
          budget.prepareUpdate(b => {
            b.spending += formData.amount;
          }),
        ),
      );

      // --- STEP 3: UPDATE TRANSACTION ---
      const updatedTx = existingTx.prepareUpdate(tx => {
        tx.amount = formData.amount;
        tx.category = formData.category.name;
        tx.date = formData.date;
        tx.note = formData.note ?? '';
      });
      operations.push(updatedTx);

      await database.batch(...operations);
      return updatedTx;
    } catch (error) {
      console.log('Update Transaction and Update Budget Error: ', error);
      throw error;
    }
  });
}

// Delete transaction and update budgets
export async function deleteTransactionByIdAndUpdateBudget(id: string) {
  try {
    // find existing transaction
    const transaction = await transactionsCollection.find(id);
    if (!transaction) return;

    // delete existing transaction
    await database.write(async () => {
      // find relevant budgets
      const budgets = await budgetsCollection
        .query(
          Q.where('category', transaction.category),
          Q.where('startDate', Q.lte(transaction.date.getTime())),
          Q.where('endDate', Q.gte(transaction.date.getTime())),
        )
        .fetch();

      // prepare all changes synchronously
      // operations = [TransactionObject, BudgetOp1, BudgetOp2]
      const operations = [
        transaction.prepareDestroyPermanently(),
        ...budgets.map(budget =>
          budget.prepareUpdate(b => {
            b.spending -= transaction.amount;
          }),
        ),
      ];

      // Execute everything in ONE hit to the disk
      await database.batch(...operations);
    });
  } catch (error) {
    console.log('Delete Transaction and Update Budget Error: ', error);
    throw error;
  }
}
