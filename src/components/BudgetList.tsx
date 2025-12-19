import { FlatList, StyleSheet, Text, View } from 'react-native';
import NoData from './NoData';
import { Budget } from '../types/budget-types';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  budgets: Budget[];
};

export default function BudgetList({ budgets }: Props) {
  const { colors } = useAppTheme();
  return (
    <FlatList
      data={budgets}
      renderItem={({ item }) => (
        <View>
          <Text style={{ color: colors.text }}>{item.category.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.contentStyle}
      ListEmptyComponent={
        <NoData title="No Budgets" description="Please add new budgets" />
      }
    />
  );
}

const styles = StyleSheet.create({ contentStyle: { flexGrow: 1, gap: 20 } });
