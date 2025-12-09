import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SummaryCard from '../../components/SummaryCard';
import RecentBudgets from '../../components/RecentBudgets';
import RecentTransactions from '../../components/RecentTransactions';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header greetings="Good Morning" name="Surabhi" />
      <SummaryCard income={60000} expense={30000} month="Dec 2025" />
      <RecentBudgets />
      <RecentTransactions />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, paddingHorizontal: 10 },
});
