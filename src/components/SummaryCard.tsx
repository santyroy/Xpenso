import { StyleSheet, Text, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import LinearGradient from 'react-native-linear-gradient';
import Loading from './Loading';
import { useAppTheme } from '../hooks/useAppTheme';
import { useUser } from '../hooks/useUser';
import { formatAmount } from '../utils/text-utils';

type Props = {
  month: string;
  income: number;
  expense: number;
};

export default function SummaryCard({ month, income, expense }: Props) {
  const { colors } = useAppTheme();
  const { isLoading, currency } = useUser();
  if (isLoading) return <Loading />;
  const balance = income - expense || 0;
  const formattedIncome = formatAmount(income, currency);
  const formattedExpense = formatAmount(expense, currency);
  const formattedBalance = formatAmount(balance, currency);

  return (
    <LinearGradient
      colors={['#002B12', '#004D20', '#007A33']}
      style={[styles.container, { backgroundColor: colors.card }]}
    >
      <View style={styles.balanceContainer}>
        <View>
          <Text style={[{ color: colors.text }]}>Total Balance</Text>
          <Text style={[{ color: colors.text }, styles.balanceAmountText]}>
            {formattedBalance}
          </Text>
        </View>
        <Text
          style={[
            { color: colors.text, borderColor: colors.text },
            styles.balanceMonthText,
          ]}
        >
          {month}
        </Text>
      </View>

      <View style={styles.incomeExpenseContainer}>
        <View style={styles.transactionContainer}>
          <FontAwesome6
            name="circle-arrow-up"
            iconStyle="solid"
            color={colors.primary}
            size={24}
          />
          <View>
            <Text style={[{ color: colors.text }]}>Income</Text>
            <Text style={[{ color: colors.text }, styles.transactionText]}>
              {formattedIncome}
            </Text>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <FontAwesome6
            name="circle-arrow-down"
            iconStyle="solid"
            color={colors.notification}
            size={24}
          />
          <View>
            <Text style={[{ color: colors.text }]}>Expense</Text>
            <Text style={[{ color: colors.text }, styles.transactionText]}>
              {formattedExpense}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 14,
    gap: 20,
  },
  balanceContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceAmountText: { fontSize: 22, fontWeight: 500 },
  balanceMonthText: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionContainer: { flexDirection: 'row', gap: 15, alignItems: 'center' },
  transactionText: { fontSize: 16, fontWeight: 500 },
});
