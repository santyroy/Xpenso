import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: Variant;
} & PressableProps;

type Variant = 'primary' | 'secondary' | 'outline';

export default function Button({
  text,
  style,
  textStyle,
  variant = 'primary',
  ...rest
}: Props) {
  const { colors, fonts } = useAppTheme();

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case 'secondary':
        return { backgroundColor: colors.secondary };
      case 'primary':
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
        return { color: colors.primary };
      default:
        return { color: colors.text };
    }
  };

  return (
    <Pressable style={[style, styles.btn, getVariantStyle()]} {...rest}>
      <Text
        style={[
          textStyle,
          getTextStyle(),
          { fontWeight: fonts.bold.fontWeight },
          styles.text,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { alignItems: 'center', padding: 15, borderRadius: 14 },
  text: { fontSize: 16 },
});
