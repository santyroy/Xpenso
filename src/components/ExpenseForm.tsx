import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import CalendarButton from './CalendarButton';
import CategoryList from './CategoryList';
import Error from './Error';
import { expenseCategories } from '../utils/categories';
import {
  Category,
  SerializableTransaction,
  TransactionFormData,
} from '../types/transaction-types';
import { TransactionFormError } from '../types/errors-types';
import {
  createTransactionAndUpdateBudget,
  updateTransactionByIdAndUpdateBudget,
} from '../db/repository/transaction-repository';
import {
  generateTimestamp,
  validateTransactionForm,
} from '../utils/form-utils';
import { AddTransactionScreenNavigationProp } from '../types/navigation-types';

type ExpenseFormProps = {
  navigation: AddTransactionScreenNavigationProp;
  transactionToEdit: SerializableTransaction | undefined;
};

export default function ExpenseForm({
  navigation,
  transactionToEdit,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState(
    transactionToEdit?.amount.toString() ?? '',
  );
  const [category, setCategory] = useState<Category | undefined>(
    transactionToEdit?.category,
  );
  const [date, setDate] = useState(transactionToEdit?.date ?? '');
  const [note, setNote] = useState(transactionToEdit?.note ?? '');
  const [errors, setErrors] = useState<TransactionFormError>({});

  const handleAddExpense = async () => {
    const formData: TransactionFormData = {
      type: 'expense',
      amount,
      category,
      date,
      note,
    };
    if (validateTransactionForm(formData, setErrors)) {
      if (!category) return;
      const expAmt = parseFloat(amount);
      const expDate = generateTimestamp(date);
      await createTransactionAndUpdateBudget({
        ...formData,
        id: '',
        amount: expAmt,
        category: category,
        date: expDate,
      });

      // reset form
      setAmount('');
      setCategory(undefined);
      setDate('');
      setNote('');

      // navigate to home screen
      navigation.replace('AppTabs', { screen: 'Home' });
    }
  };

  const handleUpdateExpense = async () => {
    const formData: TransactionFormData = {
      type: 'expense',
      amount,
      category,
      date,
      note,
    };
    if (validateTransactionForm(formData, setErrors)) {
      if (!category) return;
      const expAmt = parseFloat(amount);
      const expDate = generateTimestamp(date);

      if (!transactionToEdit?.id) return;
      await updateTransactionByIdAndUpdateBudget(transactionToEdit?.id, {
        ...formData,
        id: '',
        amount: expAmt,
        category: category,
        date: expDate,
      });

      // reset form
      setAmount('');
      setCategory(undefined);
      setDate('');
      setNote('');

      // navigate to home screen
      navigation.replace('AppTabs', { screen: 'Home' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Label text="Amount*" />
        <Input
          state={amount}
          setState={setAmount}
          placeholder="Enter Amount"
          keyboardType="decimal-pad"
        />
        {errors.amount && <Error errorMsg={errors.amount} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Category*" />
        <CategoryList
          data={expenseCategories}
          state={category}
          setState={setCategory}
        />
        {errors.category && <Error errorMsg={errors.category} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Date*" />
        <View>
          <Input state={date} placeholder="DD/MM/YYYY" readOnly />
          <CalendarButton
            setDate={setDate}
            style={styles.calendarBtn}
            hitSlop={20}
          />
        </View>
        {errors.date && <Error errorMsg={errors.date} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Note(optional)" />
        <Input
          state={note}
          setState={setNote}
          placeholder="Enter Additional Notes"
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          style={styles.inputArea}
        />
      </View>
      <View>
        <Button
          text={transactionToEdit ? 'Update Expense' : 'Add Expense'}
          variant="primary"
          onPress={transactionToEdit ? handleUpdateExpense : handleAddExpense}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 30,
  },
  formGroup: { gap: 10 },
  inputArea: { height: 100 },
  calendarBtn: {
    height: '100%',
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
});
