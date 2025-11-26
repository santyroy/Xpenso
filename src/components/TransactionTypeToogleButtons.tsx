import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TransactionType } from '../types/transactions-types';
import TransactionTypeButton from './TransactionTypeButton';

type Props = {
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
};

export default function TransactionTypeToggleButtons({
  transactionType,
  setTransactionType,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TransactionTypeButton
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        type={'expense'}
      />
      <TransactionTypeButton
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        type={'income'}
      />
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
