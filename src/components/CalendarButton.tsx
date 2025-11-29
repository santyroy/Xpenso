import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Pressable, PressableProps } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

export default function CalendarButton(props: PressableProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable {...props}>
      <FontAwesome6 name="calendar-days" size={20} color={colors.text} />
    </Pressable>
  );
}
