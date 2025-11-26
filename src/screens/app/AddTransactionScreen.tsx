import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TransactionType } from '../../types/transactions-types';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';

export default function AddTransactionScreen() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  return (
    <View style={styles.container}>
      <View style={styles.toggleBtnContainer}>
        <TransactionTypeToggleButtons
          transactionType={transactionType}
          setTransactionType={setTransactionType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toggleBtnContainer: { marginTop: 20 },
});
