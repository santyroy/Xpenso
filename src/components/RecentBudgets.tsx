import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {};

export default function RecentBudgets({}: Props) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[{ color: colors.text }, styles.headerText]}>
          Recent Budgets
        </Text>
        <Pressable>
          <Text style={[{ color: colors.text }]}>View all</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: { fontSize: 18 },
});
