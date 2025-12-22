import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';
import ExpenseAnalytics from '../../components/ExpenseAnalytics';
import IncomeAnalytics from '../../components/IncomeAnalytics';
import { TransactionType } from '../../types/transaction-types';

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
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 10, gap: 20 },
});
