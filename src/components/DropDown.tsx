import { Picker } from '@react-native-picker/picker';
import { useAppTheme } from '../hooks/useAppTheme';

type Props<T extends string | number> = {
  list: string[];
  state: T;
  setState: (state: T) => void;
};

export default function DropDown<T extends string | number>({
  list,
  state,
  setState,
}: Props<T>) {
  const { colors } = useAppTheme();
  return (
    <Picker
      selectedValue={state}
      onValueChange={(itemValue, _) => setState(itemValue)}
      mode="dropdown"
    >
      {list?.map(item => (
        <Picker.Item label={item} value={item} color={colors.text} />
      ))}
    </Picker>
  );
}
