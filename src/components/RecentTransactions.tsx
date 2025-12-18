import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../hooks/useAppTheme';
import TransactionList from './TransactionList';
import { HomeCompositeNavigationProp } from '../types/navigation-types';
import { Transaction } from '../types/transactions-types';

type Props = {
  transactions: Transaction[];
};

export default function RecentTransactions({ transactions }: Props) {
  const { colors } = useAppTheme();
  const navigation = useNavigation<HomeCompositeNavigationProp>();

  const navigativeToTransactions = () => {
    navigation.navigate('Transactions');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[{ color: colors.text }, styles.headerText]}>
          Recent Transactions
        </Text>
        <Pressable onPress={navigativeToTransactions} hitSlop={20}>
          <Text style={[{ color: colors.text }]}>View all</Text>
        </Pressable>
      </View>
      <TransactionList transactions={transactions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: { fontSize: 18 },
});
