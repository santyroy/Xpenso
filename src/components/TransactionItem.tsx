import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Transaction } from '../types/transactions-types';
import { TransactionsCompositeNavigationProp } from '../types/navigation-types';
import { useAppTheme } from '../hooks/useAppTheme';
import { capitalize } from '../utils/text-utils';

type Props = {
  item: Transaction;
};

export default function TransactionItem({ item }: Props) {
  const {
    amount,
    category: { name, iconName, color },
    date,
    type,
    note,
  } = item;
  const navigation = useNavigation<TransactionsCompositeNavigationProp>();
  const { colors } = useAppTheme();

  const amountText = type === 'expense' ? `- ${amount}` : `+ ${amount}`;
  const amountColor = type === 'expense' ? colors.notification : colors.primary;
  const categoryName = capitalize(name);
  const noteText =
    note && note?.length > 10 ? note?.substring(0, 10) + '...' : note;

  const navigateToTransactionForm = () => {
    navigation.navigate('AppStacks', {
      screen: 'AddTransaction',
      params: { transaction: { ...item, date: date.toISOString() } },
    });
  };

  return (
    <Pressable style={[styles.container]} onPress={navigateToTransactionForm}>
      <View style={styles.categoryContainer}>
        <FontAwesome6
          name={iconName}
          iconStyle="solid"
          size={24}
          color={color}
          style={[{ backgroundColor: colors.border }, styles.icon]}
        />
        <View>
          <Text style={[{ color: colors.text }, styles.categoryText]}>
            {categoryName}
          </Text>
          <Text style={[{ color: colors.text }]}>{noteText}</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[{ color: amountColor }, styles.amountText]}>
          {amountText}
        </Text>
        <Text style={[{ color: colors.text }]}>{date.toDateString()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  icon: { padding: 10, borderRadius: 10 },
  categoryText: { fontSize: 18 },
  amountContainer: { alignItems: 'flex-end' },
  amountText: { fontSize: 18, fontWeight: 600 },
});
