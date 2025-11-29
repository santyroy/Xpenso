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
import { incomeCategories } from '../utils/categories';
import { Category } from '../types/transactions-types';

export default function IncomeForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>();
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

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

  const handleAddIncome = () => {
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
          data={incomeCategories}
          state={category}
          setState={setCategory}
        />
      </View>
      <View style={styles.formGroup}>
        <Label text="Date*" />
        <View>
          <Input state={date} placeholder="DD/MM/YYYY" readOnly />
          <CalendarButton
            style={styles.calendarButton}
            hitSlop={20}
            onPress={handleDatePicker}
          />
        </View>
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
