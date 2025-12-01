import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import CalendarButton from './CalendarButton';
import CategoryList from './CategoryList';
import Error from './Error';
import { expenseCategories } from '../utils/categories';
import { isValidDate } from '../utils/date-utils';
import { Category } from '../types/transactions-types';
import { FormError } from '../types/errors-types';

export default function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>();
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormError>({});

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setDate(currentDate.toLocaleDateString('en-GB'));
    }
  };

  const handleDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(Date.now()),
      onChange: onDateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const validateForm = () => {
    let err: FormError = {};

    if (amount === '') {
      err.amount = 'Amount is required';
    } else if (isNaN(parseFloat(amount))) {
      err.amount = 'Invalid Amount';
    }
    if (!category) {
      err.category = 'Category is required';
    }
    if (date === '') {
      err.date = 'Date is required';
    } else if (!isValidDate(date)) {
      err.date = 'Invalid Date';
    }

    setErrors(err);
    return Object.values(err).length === 0;
  };

  const handleAddExpense = () => {
    console.log({ amount, category, date, note });
    if (validateForm()) {
      console.log('Form validation successful');
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
            style={styles.calendarBtn}
            hitSlop={20}
            onPress={handleDatePicker}
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
  calendarBtn: {
    height: '100%',
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
  },
});
