import { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TransactionType } from '../../types/transaction-types';
import TransactionTypeToggleButtons from '../../components/TransactionTypeToogleButtons';
import ExpenseForm from '../../components/ExpenseForm';
import IncomeForm from '../../components/IncomeForm';
import DeleteButton from '../../components/DeleteButton';
import {
  AppParamList,
  AddTransactionScreenNavigationProp,
} from '../../types/navigation-types';
import { deleteTransactionById } from '../../db/repository/transaction-repository';

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

  const handleDelete = useCallback(() => {
    if (!transactionToEdit) return;

    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTransactionById(transactionToEdit.id);
          navigation.goBack();
        },
      },
    ]);
  }, [transactionToEdit, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: transactionToEdit
        ? () => <DeleteButton onPress={handleDelete} />
        : undefined,
    });
  }, [navigation, transactionToEdit, handleDelete]);

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
