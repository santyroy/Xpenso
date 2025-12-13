import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../hooks/useAppTheme';
import { useTransactions } from '../hooks/useTransactions';
import TransactionList from './TransactionList';
import { HomeCompositeNavigationProp } from '../types/navigation-types';

type Props = {};

export default function RecentTransactions({}: Props) {
  const { colors } = useAppTheme();
  const navigation = useNavigation<HomeCompositeNavigationProp>();
  const { transactions } = useTransactions(5);

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
