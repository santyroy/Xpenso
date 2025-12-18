import { Picker } from '@react-native-picker/picker';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  list: string[];
  state: number | string;
  setState: (state: number | string) => void;
};

export default function DropDown({ list, state, setState }: Props) {
  const { colors } = useAppTheme();
  return (
    <Picker
      selectedValue={state}
      onValueChange={(itemValue, _) => setState(itemValue)}
      mode="dropdown"
    >
      {list?.map((month, index) => (
        <Picker.Item label={month} value={index} color={colors.text} />
      ))}
    </Picker>
  );
}
