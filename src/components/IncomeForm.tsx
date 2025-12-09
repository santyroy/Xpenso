import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import CalendarButton from './CalendarButton';
import CategoryList from './CategoryList';
import Error from './Error';
import { incomeCategories } from '../utils/categories';
import { validateForm } from '../utils/form-utils';
import { Category, TransactionForm } from '../types/transactions-types';
import { FormError } from '../types/errors-types';
import { addTransaction } from '../db/repository/transaction-repository';
import { AppParamList } from '../types/navigation-types';

type IncomeFormProps = {
  navigation: NativeStackNavigationProp<AppParamList>;
};

export default function IncomeForm({ navigation }: IncomeFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>();
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormError>({});

  const handleAddIncome = () => {
    const formData: TransactionForm = {
      type: 'income',
      amount,
      category,
      date,
      note,
    };
    if (validateForm(formData, setErrors)) {
      if (!category) return;
      const expAmt = parseFloat(amount);
      const expDate = new Date(date);
      addTransaction({
        ...formData,
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
          data={incomeCategories}
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
            style={styles.calendarButton}
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
        <Button text="Add Income" variant="primary" onPress={handleAddIncome} />
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
  calendarButton: {
    height: '100%',
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
});
