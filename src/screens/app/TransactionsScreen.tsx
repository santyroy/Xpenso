import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTransactions } from '../../hooks/useTransactions';
import { useAppTheme } from '../../hooks/useAppTheme';
import TransactionList from '../../components/TransactionList';
import DropDown from '../../components/DropDown';
import { generatePreviousYears, months } from '../../utils/text-utils';

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()],
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const { transactions } = useTransactions({
    limit: 0,
    month: months.indexOf(selectedMonth),
  });
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.dropdownContainer]}>
        <View
          style={[styles.dateContainer, { backgroundColor: colors.secondary }]}
        >
          <DropDown
            list={months}
            state={selectedMonth}
            setState={setSelectedMonth}
          />
        </View>

        <View
          style={[styles.dateContainer, { backgroundColor: colors.secondary }]}
        >
          <DropDown
            list={generatePreviousYears()}
            state={year}
            setState={setYear}
          />
        </View>
      </View>

      <View style={styles.listStyle}>
        <TransactionList transactions={transactions} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 20 },
  dropdownContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    paddingLeft: 10,
    overflow: 'hidden',
    borderRadius: 12,
  },
  listStyle: { flex: 1 },
});
