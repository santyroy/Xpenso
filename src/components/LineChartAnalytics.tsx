import { LineChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  data: { value: number; label: string }[];
};

export default function LineChartAnalytics({ data }: Props) {
  const { colors } = useAppTheme();

  return (
    <LineChart
      areaChart
      data={data}
      curved
      isAnimated
      focusEnabled
      showDataPointLabelOnFocus
      dataPointsRadius={3}
      focusedDataPointRadius={8}
      focusedDataPointColor={colors.primary}
      startFillColor={colors.primary}
      startOpacity={0.8}
      endFillColor={colors.border}
      endOpacity={0.3}
      dataPointsColor={colors.primary}
      hideRules
      xAxisLabelTextStyle={{ color: colors.text }}
      yAxisTextStyle={{ color: colors.text }}
      noOfSections={5}
    />
  );
}
