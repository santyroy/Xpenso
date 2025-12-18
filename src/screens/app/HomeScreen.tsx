import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import SummaryCard from '../../components/SummaryCard';
import RecentTransactions from '../../components/RecentTransactions';
import { greetMessage } from '../../utils/text-utils';

export default function HomeScreen() {
  const greetings = greetMessage();
  return (
    <SafeAreaView style={styles.container}>
      <Header greetings={greetings} name="Surabhi" />
      <SummaryCard income={60000} expense={30000} month="Dec 2025" />
      <RecentTransactions />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, paddingHorizontal: 10 },
});
