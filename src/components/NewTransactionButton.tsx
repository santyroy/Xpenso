import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export default function NewTransactionButton({
  onPress,
}: BottomTabBarButtonProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onPress}
      >
        <FontAwesome6 name="plus" iconStyle="solid" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
