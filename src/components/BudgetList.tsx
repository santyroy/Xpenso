import { FlatList, StyleSheet, Text, View } from 'react-native';
import NoData from './NoData';

export default function BudgetList() {
  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => (
        <View>
          <Text>Budget</Text>
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
