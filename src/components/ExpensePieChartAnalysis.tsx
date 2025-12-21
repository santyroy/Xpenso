import { PieChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../hooks/useAppTheme';
import { StyleSheet, Text, View } from 'react-native';
import { capitalize } from '../utils/text-utils';

type Props = {
  data: { value: number; color: string; label: string }[];
};

export default function ExpensePieChartAnalysis({ data }: Props) {
  const { colors } = useAppTheme();

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
});
