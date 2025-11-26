import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TransactionType } from '../types/transactions-types';

type Props = {
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
  type: TransactionType;
};

export default function TransactionTypeButton({
  transactionType,
  setTransactionType,
  type,
}: Props) {
  const { colors } = useTheme();
  const text = type[0].toUpperCase() + type.substring(1);
  return (
    <Pressable
      onPress={() => setTransactionType(type)}
      style={[
        transactionType === `${type}` && {
          backgroundColor: colors.primary,
        },
        styles.btn,
      ]}
    >
      <Text style={{ color: colors.text }}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
