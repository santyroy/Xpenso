import { StyleSheet, View } from 'react-native';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionList from '../../components/TransactionList';

export default function TransactionsScreen() {
  const { transactions } = useTransactions();

  return (
    <View style={styles.container}>
      <TransactionList transactions={transactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  contentStyle: { gap: 20 },
});
