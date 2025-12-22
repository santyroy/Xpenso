import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SummaryCard from '../../components/SummaryCard';
import RecentTransactions from '../../components/RecentTransactions';
import Loading from '../../components/Loading';
import { useTransactions } from '../../hooks/useTransactions';
import { getMonthYearString } from '../../utils/text-utils';
import { getTransactionSummary } from '../../utils/transactions-util';

export default function HomeScreen() {
  const { transactions, isLoading } = useTransactions({ limit: 0 });
  const month = useMemo(() => getMonthYearString(), []);
  const { income, expense } = useMemo(
    () => getTransactionSummary(transactions),
    [transactions],
  );
  const recentData = useMemo(() => transactions.slice(0, 5), [transactions]);

  if (isLoading) return <Loading />;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SummaryCard income={income} expense={expense} month={month} />
      <RecentTransactions transactions={recentData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, paddingHorizontal: 15, paddingTop: 10 },
});
