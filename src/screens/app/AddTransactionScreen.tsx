import { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TransactionType } from '../../types/transactions-types';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';
import ExpenseForm from '../../components/ExpenseForm';
import IncomeForm from '../../components/IncomeForm';
import {
  AppParamList,
  AddTransactionScreenNavigationProp,
} from '../../types/navigation-types';

type AddTransactionScreenRouteProp = RouteProp<AppParamList, 'AddTransaction'>;

type Props = {
  navigation: AddTransactionScreenNavigationProp;
  route: AddTransactionScreenRouteProp;
};

export default function AddTransactionScreen({ route, navigation }: Props) {
  const transactionToEdit = route.params?.transaction;
  const [transactionType, setTransactionType] = useState<TransactionType>(
    transactionToEdit?.type || 'expense',
  );

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
          <ExpenseForm
            navigation={navigation}
            transactionToEdit={transactionToEdit}
          />
        ) : (
          <IncomeForm
            navigation={navigation}
            transactionToEdit={transactionToEdit}
          />
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
