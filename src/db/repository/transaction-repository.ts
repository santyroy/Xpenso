import { Q } from '@nozbe/watermelondb';
import { database } from '../index.native';
import { Transaction } from '../../types/transactions-types';
import TransactionModel from '../models/Transaction';

const transactionsCollection = database.get('transactions');

// Add transaction
export async function addTransaction(formData: Transaction) {
  const newTransaction = await database.write(async () => {
    const row = await transactionsCollection.create(transaction => {
      const mutable = transaction as TransactionModel;
      mutable.type = formData.type;
      mutable.amount = formData.amount;
      mutable.category = formData.category.name;
      mutable.date = formData.date;
      mutable.note = formData.note || '';
    });
    return row;
  });
  return newTransaction;
}

// Fetch all transactions
export async function getAllTransactions() {
  return await transactionsCollection.query(Q.sortBy('date', 'desc')).fetch();
}

// Fetch limited transactions
export async function getTransactionsByLimit(limit: number) {
  return await transactionsCollection
    .query(Q.sortBy('date', 'desc'), Q.take(limit))
    .fetch();
}

// Fetch transactions by category
export async function getTransactionsByCategory(category: string) {
  return await transactionsCollection
    .query(Q.where('category', category))
    .fetch();
}

// Fetch transactions by date range
export async function getTransactionsByDateRange(start: Date, end: Date) {
  return await transactionsCollection
    .query(
      Q.and(Q.where('date', start.getDate()), Q.where('date', end.getDate())),
    )
    .fetch();
}

// Update transaction by id
export async function updateTransactionById(
  id: string,
  transaction: Transaction,
) {
  const currTransaction = await transactionsCollection.find(id);
  const updatedTransaction = await database.write(async () => {
    const row = await currTransaction.update(t => {
      const mutable = t as TransactionModel;
      mutable.amount = transaction.amount;
      mutable.category = transaction.category.name;
      mutable.date = transaction.date;
      mutable.note = transaction.note ?? '';
    });
    return row;
  });
  return updatedTransaction;
}

// Delete transaction by id
export async function deleteTransactionById(id: string) {
  const transaction = await transactionsCollection.find(id);
  return await database.write(async () => {
    await transaction.destroyPermanently();
  });
}
