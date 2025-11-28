import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import CategoryList from './CategoryList';
import { expenseCategories } from '../utils/categories';
import { Category } from '../types/transactions-types';

export default function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>();
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleAddExpense = () => {
    console.log({ amount, category, date, note });
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
      </View>
      <View style={styles.formGroup}>
        <Label text="Category*" />
        <CategoryList
          data={expenseCategories}
          state={category}
          setState={setCategory}
        />
      </View>
      <View style={styles.formGroup}>
        <Label text="Date*" />
        <Input
          state={date}
          setState={setDate}
          placeholder="DD/MM/YYYY"
          keyboardType="numeric"
        />
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
          text="Add Expense"
          variant="primary"
          onPress={handleAddExpense}
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
});
