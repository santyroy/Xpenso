import { Q } from '@nozbe/watermelondb';
import { database } from '../index.native';
import { Transaction } from '../../types/transaction-types';
import TransactionModel from '../models/Transaction';

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
