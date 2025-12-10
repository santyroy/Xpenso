import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../hooks/useAppTheme';
import { HomeCompositeNavigationProp } from '../types/navigation-types';

type Props = {};

export default function RecentTransactions({}: Props) {
  const { colors } = useAppTheme();
  const navigation = useNavigation<HomeCompositeNavigationProp>();

  const navigativeToTransactions = () => {
    navigation.navigate('AppStacks', { screen: 'Transactions' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[{ color: colors.text }, styles.headerText]}>
          Recent Transactions
        </Text>
        <Pressable onPress={navigativeToTransactions} hitSlop={20}>
          <Text style={[{ color: colors.text }]}>View all</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  headerText: { fontSize: 18 },
});
