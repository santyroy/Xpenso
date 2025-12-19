import { FlatList, StyleSheet } from 'react-native';
import NoData from './NoData';
import BudgetCard from './BudgetCard';
import { Budget } from '../types/budget-types';

type Props = {
  budgets: Budget[];
};

export default function BudgetList({ budgets }: Props) {
  return (
    <FlatList
      data={budgets}
      renderItem={({ item }) => <BudgetCard budget={item} />}
      contentContainerStyle={styles.contentStyle}
      ListEmptyComponent={
        <NoData title="No Budgets" description="Please add new budgets" />
      }
    />
  );
}

const styles = StyleSheet.create({ contentStyle: { flexGrow: 1, gap: 20 } });
