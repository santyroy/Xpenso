import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import Logo from './Logo';

type Props = {
  pageTitle: string;
};

export default function SignupHeader({ pageTitle }: Props) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Logo height={50} width={50} />
        <Text style={[styles.logoText, { color: colors.text }]}>penso</Text>
      </View>
      <Text style={[styles.pageTitle, { color: colors.text }]}>
        {pageTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { gap: 20 },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { fontSize: 24 },
  pageTitle: {
    fontSize: 36,
    fontWeight: 700,
    textAlign: 'center',
  },
});
