import { BarChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../hooks/useAppTheme';
import { formatYLabelBarChart } from '../utils/text-utils';

type Props = {
  data: { label: string; value: number }[];
};

export default function ExpenseBarChartAnalysis({ data }: Props) {
  const { colors } = useAppTheme();
  // 1. Find the highest single value
  const highestValue = Math.max(...data.map(item => item.value), 0);

  // Round to 100s if value is small, 1000s if large
  const roundTo = highestValue > 1000 ? 1000 : 100;

  // 2. Round up to a clean number (e.g., if max is 3600, make it 4000)
  // This helps noOfSections divide evenly
  const maxValue = Math.ceil(highestValue / roundTo) * roundTo || roundTo;

  const noOfSections = 5;
  const stepValue = maxValue / noOfSections;

  return (
    <BarChart
      data={data}
      frontColor={colors.primary}
      isAnimated
      xAxisLabelTextStyle={{ color: colors.text }}
      yAxisTextStyle={{ color: colors.text }}
      yAxisLabelWidth={60}
      rulesColor={colors.text + 50}
      formatYLabel={formatYLabelBarChart}
      maxValue={maxValue}
      noOfSections={noOfSections}
      stepValue={stepValue}
      hideRules={false}
      yAxisThickness={0}
      xAxisThickness={0}
    />
  );
}
