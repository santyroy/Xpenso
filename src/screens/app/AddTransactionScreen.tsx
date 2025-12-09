import { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TransactionType } from '../../types/transactions-types';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';
import ExpenseForm from '../../components/ExpenseForm';
import IncomeForm from '../../components/IncomeForm';
import { AppParamList } from '../../types/navigation-types';

type AddTransactionScreenNavigationProp = NativeStackNavigationProp<
  AppParamList,
  'AppStacks'
>;

export default function AddTransactionScreen() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  const navigation = useNavigation<AddTransactionScreenNavigationProp>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
        {transactionType === 'expense' ? (
          <ExpenseForm navigation={navigation} />
        ) : (
          <IncomeForm navigation={navigation} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toggleBtnContainer: { marginTop: 20 },
  scrollViewContent: { paddingBottom: 10 },
});
