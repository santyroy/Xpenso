import { FlatList, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import { Transaction } from '../types/transactions-types';

type Props = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: Props) {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => <TransactionItem item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.contentStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentStyle: { gap: 20 },
});
