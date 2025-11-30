import { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { TransactionType } from '../../types/transactions-types';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';
import ExpenseForm from '../../components/ExpenseForm';
import IncomeForm from '../../components/IncomeForm';

export default function AddTransactionScreen() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
      style={styles.container}
    >
      <View style={styles.toggleBtnContainer}>
        <TransactionTypeToggleButtons
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        {transactionType === 'expense' ? <ExpenseForm /> : <IncomeForm />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toggleBtnContainer: { marginTop: 20 },
  scrollViewContent: { paddingBottom: 10 },
});
