import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = { errorMsg: string };

export default function Error({ errorMsg }: Props) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <FontAwesome6
        name="circle-xmark"
        iconStyle="solid"
        size={14}
        color={colors.notification}
      />
      <Text style={[styles.text, { color: colors.notification }]}>
        {errorMsg}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  text: { fontSize: 16 },
});
