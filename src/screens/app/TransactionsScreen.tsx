import { FlatList, StyleSheet, View } from 'react-native';
import TransactionItem from '../../components/TransactionItem';
import { useTransactions } from '../../hooks/useTransactions';

export default function TransactionsScreen() {
  const { transactions } = useTransactions();

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  contentStyle: { gap: 20 },
});
