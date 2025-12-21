import { ActivityIndicator } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

export default function Loading() {
  const { colors } = useAppTheme();
  return <ActivityIndicator color={colors.primary} size={'large'} />;
}
