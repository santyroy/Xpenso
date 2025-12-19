import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BudgetHeader from '../../components/BudgetHeader';
import BudgetList from '../../components/BudgetList';
import { BudgetCompositeNavigationProp } from '../../types/navigation-types';

type Props = {
  navigation: BudgetCompositeNavigationProp;
};

export default function BudgetScreen({ navigation }: Props) {
  const navigateToAddBudget = () => {
    navigation.navigate('AddBudget');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BudgetHeader onPress={navigateToAddBudget} />
      <BudgetList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
});
