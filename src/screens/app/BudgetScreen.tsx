import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BudgetHeader from '../../components/BudgetHeader';
import BudgetList from '../../components/BudgetList';
import { BudgetCompositeNavigationProp } from '../../types/navigation-types';
import { useBudgets } from '../../hooks/useBudgets';

type Props = {
  navigation: BudgetCompositeNavigationProp;
};

export default function BudgetScreen({ navigation }: Props) {
  const navigateToAddBudget = () => {
    navigation.navigate('AddBudget');
  };
  const { budgets } = useBudgets();

  return (
    <SafeAreaView style={styles.container}>
      <BudgetHeader onPress={navigateToAddBudget} />
      <BudgetList budgets={budgets} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
});
