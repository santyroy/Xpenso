import { Model, Q } from '@nozbe/watermelondb';
import { database } from '../index.native';
import { Transaction } from '../../types/transaction-types';
import TransactionModel from '../models/TransactionModel';
import BudgetModel from '../models/BudgetModel';
import { budgetsCollection } from './budget-repository';

export const transactionsCollection =
  database.get<TransactionModel>('transactions');

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

// Fetch limited transactions
export function getTransactionsSubcriptionByLimit(limit: number) {
  return transactionsCollection
    .query(Q.sortBy('date', 'desc'), Q.take(limit))
    .observe();
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

// Fetch transactions by date range
export function getTransactionsSubcriptionByDateRange(start: Date, end: Date) {
  return transactionsCollection
    .query(
      Q.where('date', Q.between(start.getTime(), end.getTime())),
      Q.sortBy('date', 'desc'),
    )
    .observe();
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

/**
 * Updates a transaction and reconciles all affected budgets.
 * Handles: same category, different category, and date changes.
 */
export async function updateTransactionByIdAndUpdateBudget(
  id: string,
  formData: Transaction,
) {
  // 1. Find the existing transaction
  const existingTx = await transactionsCollection.find(id);
  if (!existingTx) throw new Error('Transaction not found');

  try {
    return await database.write(async () => {
      const operations: Model[] = [];

      /**
       * We use a Map to track how much each budget needs to change.
       * Key: Budget ID
       * Value: { model: Budget, netChange: number }
       */
      const budgetMap = new Map<
        string,
        { model: BudgetModel; netChange: number }
      >();

      // --- STEP A: CALCULATE REFUND (Old Data) ---
      const oldBudgets = await budgetsCollection
        .query(
          Q.where('category', existingTx.category),
          Q.where('startDate', Q.lte(existingTx.date.getTime())),
          Q.where('endDate', Q.gte(existingTx.date.getTime())),
        )
        .fetch();

      oldBudgets.forEach(budget => {
        budgetMap.set(budget.id, {
          model: budget,
          netChange: -existingTx.amount, // Subtract the old amount
        });
      });

      // --- STEP B: CALCULATE CHARGE (New Data) ---
      const newBudgets = await budgetsCollection
        .query(
          Q.where('category', formData.category.name),
          Q.where('startDate', Q.lte(formData.date.getTime())),
          Q.where('endDate', Q.gte(formData.date.getTime())),
        )
        .fetch();

      newBudgets.forEach(budget => {
        const existingEntry = budgetMap.get(budget.id);
        if (existingEntry) {
          // If this budget was already in the map (category/date didn't change)
          // We just add the new amount to the existing negative netChange
          existingEntry.netChange += formData.amount;
        } else {
          // New budget that wasn't affected by the old transaction
          budgetMap.set(budget.id, {
            model: budget,
            netChange: formData.amount,
          });
        }
      });

      // --- STEP C: PREPARE BUDGET OPERATIONS ---
      // Now we only call prepareUpdate ONCE per unique budget
      budgetMap.forEach(({ model, netChange }) => {
        // Optimization: If netChange is 0 (e.g., edited a note but not amount/category),
        // we don't need to update the budget record at all.
        if (netChange !== 0) {
          operations.push(
            model.prepareUpdate(b => {
              b.spending += netChange;
            }),
          );
        }
      });

      // --- STEP D: PREPARE TRANSACTION UPDATE ---
      const updatedTxOperation = existingTx.prepareUpdate(tx => {
        tx.amount = formData.amount;
        tx.category = formData.category.name;
        tx.date = formData.date;
        tx.note = formData.note ?? '';
      });
      operations.push(updatedTxOperation);

      // --- STEP E: ATOMIC BATCH EXECUTE ---
      await database.batch(...operations);

      return updatedTxOperation;
    });
  } catch (error) {
    console.error('Update Transaction and Budget Error: ', error);
    throw error;
  }
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
