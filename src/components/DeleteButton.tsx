import { Pressable, PressableProps } from 'react-native';
import { NativeStackHeaderItemProps } from '@react-navigation/native-stack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = NativeStackHeaderItemProps & PressableProps;

export default function DeleteButton(props: Props) {
  const { colors } = useAppTheme();
  return (
    <Pressable {...props}>
      <FontAwesome6
        name="trash-can"
        iconStyle="solid"
        size={18}
        color={colors.text}
      />
    </Pressable>
  );
}
