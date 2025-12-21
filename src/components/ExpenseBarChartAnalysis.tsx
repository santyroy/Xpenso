import { BarChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../hooks/useAppTheme';

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
      rulesColor={colors.text + 50}
      noOfSections={5}
    />
  );
}
