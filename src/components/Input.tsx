import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  state: string;
  setState: (state: string) => void;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export default function Input({ state, setState, style, ...rest }: Props) {
  const { colors } = useAppTheme();

  return (
    <TextInput
      value={state}
      onChangeText={setState}
      placeholderTextColor={colors.border}
      cursorColor={colors.text}
      style={[
        style,
        styles.input,
        { color: colors.text, borderColor: colors.border },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 15,
  },
});
