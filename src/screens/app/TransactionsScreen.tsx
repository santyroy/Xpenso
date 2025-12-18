import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTransactions } from '../../hooks/useTransactions';
import { useAppTheme } from '../../hooks/useAppTheme';
import TransactionList from '../../components/TransactionList';
import DropDown from '../../components/DropDown';
import { months } from '../../utils/text-utils';

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const { transactions } = useTransactions({ limit: 0, month: selectedMonth });
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dropdownContainer,
          { backgroundColor: colors.secondary },
        ]}
      >
        <DropDown
          list={months}
          state={selectedMonth}
          setState={setSelectedMonth}
        />
      </View>
      <View style={styles.listStyle}>
        <TransactionList transactions={transactions} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  dropdownContainer: {
    width: '60%',
    marginHorizontal: 'auto',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  listStyle: { flex: 1 },
});
