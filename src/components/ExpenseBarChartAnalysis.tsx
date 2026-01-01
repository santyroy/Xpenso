import { BarChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../hooks/useAppTheme';
import { formatYLabelBarChart } from '../utils/text-utils';

type Props = {
  data: { label: string; value: number }[];
};

export default function ExpenseBarChartAnalysis({ data }: Props) {
  const { colors } = useAppTheme();

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
    />
  );
}
