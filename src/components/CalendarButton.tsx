import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Pressable, PressableProps } from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  setDate: (date: string) => void;
} & PressableProps;

export default function CalendarButton({ setDate, ...rest }: Props) {
  const { colors } = useAppTheme();

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setDate(currentDate.toDateString());
    }
  };

  const handleDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(Date.now()),
      onChange: onDateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <Pressable {...rest} onPress={handleDatePicker}>
      <FontAwesome6 name="calendar-days" size={20} color={colors.text} />
    </Pressable>
  );
}
