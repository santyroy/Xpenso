import { StyleSheet, View } from 'react-native';
import Loading from './Loading';
import RecentTransactions from './RecentTransactions';
import { useIncomeAnalytics } from '../hooks/useIncomeAnalytics';
import { getTransactionsGroupByMonth } from '../utils/transactions-util';
import IncomeLineChartAnalytics from './IncomeLineChartAnalytics';

export default function IncomeAnalytics() {
  const { income, isLoading } = useIncomeAnalytics();
  const incomeByMonth = getTransactionsGroupByMonth(income);

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <IncomeLineChartAnalytics data={incomeByMonth} />
      <RecentTransactions transactions={income} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 30, overflow: 'hidden' },
});
