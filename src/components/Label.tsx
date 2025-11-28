import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
} & TextProps;

export default function Label({ text, style, ...rest }: Props) {
  const { colors, fonts } = useAppTheme();

  return (
    <Text
      style={[
        styles.text,
        {
          color: colors.text,
          fontWeight: fonts.bold.fontWeight,
        },
        StyleSheet.flatten(style),
      ]}
      {...rest}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 16 },
});
