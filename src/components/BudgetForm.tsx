import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Label from './Label';
import Input from './Input';
import Error from './Error';
import CategoryList from './CategoryList';
import CalendarButton from './CalendarButton';
import DropDown from './DropDown';
import Button from './Button';
import { budgetPeriod } from '../utils/text-utils';
import {
  generateBudgetEndDate,
  generateTimestamp,
  validateBudgetForm,
} from '../utils/form-utils';
import { expenseCategories } from '../utils/categories';
import { useAppTheme } from '../hooks/useAppTheme';
import { BudgetFormData, Category, Period } from '../types/budget-types';
import { BudgetFormError } from '../types/errors-types';
import { AddBudgetScreenNavigationProp } from '../types/navigation-types';
import { addBudget } from '../db/repository/budget-repository';

export default function BudgetForm() {
  const [amountLimit, setAmountLimit] = useState('');
  const [category, setCategory] = useState<Category | undefined>();
  const [startDate, setStartDate] = useState('');
  const [period, setPeriod] = useState<Period>('Daily');
  const [errors, setErrors] = useState<BudgetFormError>({});

  const { colors } = useAppTheme();
  const navigation = useNavigation<AddBudgetScreenNavigationProp>();

  const handleAddBudget = async () => {
    const formData: BudgetFormData = {
      type: 'expense',
      amountLimit,
      category,
      startDate,
      period,
    };
    if (validateBudgetForm(formData, setErrors)) {
      if (!category) return;
      const budgetAmt = parseFloat(amountLimit);
      const budgetStartDate = generateTimestamp(startDate);
      const budgetEndDate = generateBudgetEndDate(startDate, period);

      await addBudget({
        id: '',
        type: 'expense',
        amountLimit: budgetAmt,
        category: category,
        startDate: budgetStartDate,
        endDate: budgetEndDate,
      });

      // reset form
      setAmountLimit('');
      setCategory(undefined);
      setStartDate('');
      setPeriod('Daily');

      // navigate to home screen
      navigation.navigate('AppTabs', { screen: 'Budget' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Label text="Amount Limit*" />
        <Input
          state={amountLimit}
          setState={setAmountLimit}
          placeholder="Enter Amount"
          keyboardType="decimal-pad"
        />
        {errors?.amountLimit && <Error errorMsg={errors.amountLimit} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Category*" />
        <CategoryList
          data={expenseCategories}
          state={category}
          setState={setCategory}
        />
        {errors?.category && <Error errorMsg={errors.category} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Start Date*" />
        <View>
          <Input state={startDate} placeholder="DD/MM/YYYY" readOnly />
          <CalendarButton
            setDate={setStartDate}
            style={styles.calendarBtn}
            hitSlop={20}
          />
        </View>
        {errors?.startDate && <Error errorMsg={errors.startDate} />}
      </View>
      <View style={styles.formGroup}>
        <Label text="Period*" />
        <View style={[styles.period, { borderColor: colors.border }]}>
          <DropDown list={budgetPeriod} state={period} setState={setPeriod} />
        </View>
        {errors?.period && <Error errorMsg={errors.period} />}
      </View>
      <View>
        <Button
          text={'Add Budget'}
          variant="primary"
          onPress={handleAddBudget}
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
  period: { borderWidth: 2, borderRadius: 14 },
});
