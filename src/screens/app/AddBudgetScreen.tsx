import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Error from '../../components/Error';
import CategoryList from '../../components/CategoryList';
import CalendarButton from '../../components/CalendarButton';
import DropDown from '../../components/DropDown';
import Button from '../../components/Button';
import { Category } from '../../types/transaction-types';
import { BudgetFormError } from '../../types/errors-types';
import { BudgetForm } from '../../types/budget-types';
import { useAppTheme } from '../../hooks/useAppTheme';
import { expenseCategories } from '../../utils/categories';
import { budgetPeriod } from '../../utils/text-utils';
import { validateBudgetForm } from '../../utils/form-utils';

export default function AddBudgetScreen() {
  const [amountLimit, setAmountLimit] = useState('');
  const [category, setCategory] = useState<Category | undefined>();
  const [startDate, setStartDate] = useState('');
  const [period, setPeriod] = useState(budgetPeriod[0]);
  const [errors, setErrors] = useState<BudgetFormError>({});

  const { colors } = useAppTheme();

  const handleAddBudget = async () => {
    const formData: BudgetForm = {
      type: 'expense',
      amountLimit,
      category,
      startDate,
      period,
    };
    if (validateBudgetForm(formData, setErrors)) {
      console.log('submitting budget: ', formData);
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
