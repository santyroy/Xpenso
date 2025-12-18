import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SummaryCard from '../../components/SummaryCard';
import RecentTransactions from '../../components/RecentTransactions';
import { useTransactions } from '../../hooks/useTransactions';
import { getMonthYearString, greetMessage } from '../../utils/text-utils';
import { getTransactionSummary } from '../../utils/transactions-util';

export default function HomeScreen() {
  const greetings = useMemo(() => greetMessage(), []);
  const month = useMemo(() => getMonthYearString(), []);
  const { transactions } = useTransactions({ limit: 0 });
  const { income, expense } = useMemo(
    () => getTransactionSummary(transactions),
    [transactions],
  );
  const recentData = useMemo(() => transactions.slice(0, 5), [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <Header greetings={greetings} name="Surabhi" />
      <SummaryCard income={income} expense={expense} month={month} />
      <RecentTransactions transactions={recentData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, paddingHorizontal: 10 },
});
