import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation-types';
import AddBudgetScreen from '../screens/app/AddBudgetScreen';
import AddTransactionScreen from '../screens/app/AddTransactionScreen';
import TransactionsScreen from '../screens/app/TransactionsScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddBudget" component={AddBudgetScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
}
