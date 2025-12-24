import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Loading from './Loading';
import DropDown from './DropDown';
import NoData from './NoData';
import ExpenseBarChartAnalysis from './ExpenseBarChartAnalysis';
import ExpensePieChartAnalysis from './ExpensePieChartAnalysis';
import { useAppTheme } from '../hooks/useAppTheme';
import { useTransactions } from '../hooks/useTransactions';
import { generatePreviousYears, months } from '../utils/text-utils';
import {
  getExpenseBarChatData,
  getExpensePieChatData,
} from '../utils/transactions-util';

export default function ExpenseAnalytics() {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const { isLoading, transactions } = useTransactions({
    limit: 0,
    month: months.indexOf(month),
    year: parseInt(year, 10),
  });
  const { colors } = useAppTheme();

  const barChartData = getExpenseBarChatData(transactions);
  const { totalExpense, data } = getExpensePieChatData(transactions);
  const years = generatePreviousYears();

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentStyle}
    >
      <View style={[styles.monthsContainer, { backgroundColor: colors.card }]}>
        <DropDown list={months} state={month} setState={setMonth} />
        <DropDown list={years} state={year} setState={setYear} />
      </View>

      {barChartData.length ? (
        <View
          style={[
            styles.barChartParentContainer,
            { backgroundColor: colors.card },
          ]}
        >
          <View style={styles.barChartContainer}>
            <ExpenseBarChartAnalysis data={barChartData} />
          </View>
        </View>
      ) : (
        <NoData
          title="No expenses"
          description="You have not spent any amount"
        />
      )}

      <ExpensePieChartAnalysis data={data} totalExpense={totalExpense} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentStyle: { gap: 15 },
  barChartParentContainer: {
    paddingRight: 16,
    borderRadius: 20,
  },
  monthsContainer: { paddingLeft: 10, overflow: 'hidden', borderRadius: 12 },
  barChartContainer: { padding: 20, alignItems: 'center', overflow: 'hidden' },
});
