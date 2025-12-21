import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionType } from '../../types/transaction-types';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';
import { StyleSheet } from 'react-native';
import ExpenseAnalytics from '../../components/ExpenseAnalytics';
import IncomeAnalytics from '../../components/IncomeAnalytics';

export default function AnalyticsScreen() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  return (
    <SafeAreaView style={styles.container}>
      <TransactionTypeToggleButtons
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />
      {transactionType === 'expense' ? (
        <ExpenseAnalytics />
      ) : (
        <IncomeAnalytics />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20 },
});
