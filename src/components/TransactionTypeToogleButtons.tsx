import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TransactionType } from '../types/transaction-types';
import TransactionTypeButton from './TransactionTypeButton';

type Props = {
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
};

export default function TransactionTypeToggleButtons(props: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TransactionTypeButton type={'expense'} {...props} />
      <TransactionTypeButton type={'income'} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 'auto',
    padding: 5,
    borderRadius: 50,
  },
});
