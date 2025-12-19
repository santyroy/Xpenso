import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = {} & PressableProps;

export default function BudgetHeader(props: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: colors.text }]}>
        My Budgets
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: colors.border }]}
        hitSlop={20}
        {...props}
      >
        <FontAwesome6
          name="plus"
          iconStyle="solid"
          size={16}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  button: {
    height: 34,
    width: 34,
    borderRadius: 17,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
