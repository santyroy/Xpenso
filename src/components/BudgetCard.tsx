import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Budget } from '../types/budget-types';
import { useAppTheme } from '../hooks/useAppTheme';
import { capitalize } from '../utils/text-utils';

type Props = {
  budget: Budget;
};

export default function BudgetCard({ budget }: Props) {
  const { colors } = useAppTheme();
  let { category, amountLimit, spending, startDate, endDate } = budget;
  const categoryName = capitalize(category.name);

  const percentage = amountLimit > 0 ? (spending / amountLimit) * 100 : 0;
  const progressWith = Math.min(percentage, 100);
  const progressColor =
    progressWith >= 80 ? colors.notification : colors.primary;

  const isOverspent = spending > amountLimit;
  const amountSpent = amountLimit - spending;
  const absAmountSpent = Math.abs(amountSpent);
  const amountSpentText = isOverspent ? 'overspent' : 'left';
  const amountSpentTextColor =
    amountSpent < 0 ? colors.notification : colors.text;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <View
            style={[
              styles.categoryIcon,
              { backgroundColor: category.color + 20 },
            ]}
          >
            <FontAwesome6
              name={category.iconName}
              iconStyle="solid"
              color={category.color}
              size={18}
            />
          </View>
          <Text style={[styles.categoryName, { color: colors.text }]}>
            {categoryName}
          </Text>
        </View>
        <View>
          <Pressable hitSlop={20}>
            <FontAwesome6
              name="ellipsis-vertical"
              iconStyle="solid"
              color={colors.text + 70}
              size={20}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.limitContainer}>
        <Text style={[styles.limitText, { color: colors.text }]}>
          Rs. {amountLimit}
        </Text>
        <Text style={[styles.limitPercentage, { color: colors.text }]}>
          {progressWith}%
        </Text>
      </View>
      <View
        style={[
          styles.progressBarContainer,
          { backgroundColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            { width: `${progressWith}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
      <View style={styles.spendingContainer}>
        <Text style={[styles.spendingText, { color: colors.text + 50 }]}>
          - Rs. {spending} spent
        </Text>
        <Text
          style={[styles.spendingLeftText, { color: amountSpentTextColor }]}
        >
          Rs. {absAmountSpent} {amountSpentText}
        </Text>
      </View>
      <View style={[styles.dateContainer]}>
        <Text style={[styles.dateText, { color: colors.text }]}>
          Starts: {startDate.toLocaleDateString('en-GB')}
        </Text>
        <Text style={[styles.dateText, { color: colors.text }]}>
          Ends: {endDate.toLocaleDateString('en-GB')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, borderRadius: 14, gap: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  categoryIcon: { padding: 10, borderRadius: 8 },
  categoryName: { fontSize: 16, fontWeight: 600 },
  limitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  limitText: { fontSize: 16, fontWeight: 600 },
  limitPercentage: { fontWeight: 600 },
  progressBarContainer: { height: 5, borderRadius: 10 },
  progressBar: { height: 5, borderRadius: 10 },
  spendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingText: {},
  spendingLeftText: { fontWeight: 600 },
  dateContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  dateText: { fontSize: 12 },
});
