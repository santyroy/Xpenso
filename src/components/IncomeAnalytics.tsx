import { StyleSheet, View } from 'react-native';
import Loading from './Loading';
import RecentTransactions from './RecentTransactions';
import { useTransactions } from '../hooks/useTransactions';
import { getTransactionsGroupByMonth } from '../utils/transactions-util';
import LineChartAnalytics from './LineChartAnalytics';

export default function IncomeAnalytics() {
  const { isLoading, transactions } = useTransactions({
    month: new Date().getMonth(),
  });

  const incomeByMonth = getTransactionsGroupByMonth(transactions);
  console.log(incomeByMonth);

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LineChartAnalytics data={incomeByMonth} />
      <RecentTransactions transactions={transactions.slice(0, 10)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 30, overflow: 'hidden' },
});
