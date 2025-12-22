import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Loading from './Loading';
import { useAppTheme } from '../hooks/useAppTheme';
import { useUser } from '../hooks/useUser';
import { capitalize, formatAmount } from '../utils/text-utils';

type Props = {
  totalExpense: number;
  data: { value: number; color: string; label: string; text: string }[];
};

export default function ExpensePieChartAnalysis({ totalExpense, data }: Props) {
  const { colors } = useAppTheme();
  const { currency } = useUser();

  if (!currency) {
    return <Loading />;
  }

  const renderCenterLabel = () => {
    return (
      <Text style={[styles.centerLabelText, { color: colors.text }]}>
        {formatAmount(totalExpense, currency)}
      </Text>
    );
  };

  const renderLegend = () => {
    return data.map(item => (
      <View style={styles.legend} key={item.label}>
        <View style={[styles.legendView, { backgroundColor: item.color }]} />
        <Text style={{ color: colors.text }}>{capitalize(item.label)}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.pieChartContainer}>
      <PieChart
        data={data}
        donut
        showText
        innerCircleColor={colors.background}
        textSize={14}
        centerLabelComponent={renderCenterLabel}
      />
      <View style={styles.legendContainer}>{renderLegend()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pieChartContainer: { alignItems: 'center', gap: 20 },
  legendContainer: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legend: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  legendView: { height: 10, aspectRatio: 1, borderRadius: 5 },
  legendText: {},
  centerLabelText: { fontWeight: 600, fontSize: 16 },
});
